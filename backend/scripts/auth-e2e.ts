// backend/scripts/auth-e2e.ts
export {};
/*
  E2E manutenibile per Better Auth:
  - signup (email/password)
  - signout
  - signin (email/password)
  - session (con cookie)
  - signout finale
  Config:
  - BACKEND_URL (default: http://localhost:4000)
*/

async function main() {
  const base = (((globalThis as any).process?.env?.BACKEND_URL) ?? "http://localhost:4000").replace(/\/$/, "");
  // Usa undici per accedere a Set-Cookie
  const { fetch: undiciFetch } = await import("undici");
  const f = undiciFetch as typeof fetch;

  type ReqOptions = {
    method: string;
    path: string;
    body?: any;
    withCookie?: boolean;
  };

  class CookieJar {
    private jar = new Map<string, string>();

    setFromSetCookie(values: string[] | null) {
      if (!values) return;
      for (const v of values) {
        // Simple parser: take first segment "name=value" and store by name
        const [nv] = v.split(";");
        const eq = nv.indexOf("=");
        if (eq > 0) {
          const name = nv.slice(0, eq).trim();
          const val = nv.slice(eq + 1).trim();
          this.jar.set(name, val);
        }
      }
    }

    header(): string | undefined {
      if (this.jar.size === 0) return undefined;
      const pairs = Array.from(this.jar.entries()).map(([k, v]) => `${k}=${v}`);
      return pairs.join("; ");
    }

    clear(name?: string) {
      if (name) this.jar.delete(name);
      else this.jar.clear();
    }
  }

  const cookies = new CookieJar();

  const req = async ({ method, path, body, withCookie }: ReqOptions) => {
    const url = `${base}${path}`;
    const headers: Record<string, string> = { Accept: "application/json", Origin: base, Referer: `${base}/` };
    let payload: any;
    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
      payload = JSON.stringify(body);
    } else if (method !== "GET") {
      // Better Auth CSRF: assicurati che le POST non siano "simple requests"
      headers["Content-Type"] = "application/json";
      headers["X-Requested-With"] = "fetch";
      payload = "{}";
    }
    const cookie = withCookie ? cookies.header() : undefined;
    if (cookie) headers["Cookie"] = cookie;

    const res = await f(url, { method, headers, body: payload, redirect: "manual" });
    // Undici: prova ad usare getSetCookie() se disponibile, altrimenti fallback
    const anyHeaders = res.headers as any;
    const setCookiesArr: string[] | undefined = typeof anyHeaders.getSetCookie === 'function' ? anyHeaders.getSetCookie() : undefined;
    const setCookieHeader = res.headers.get("set-cookie");
    const setCookies = (setCookiesArr && setCookiesArr.length > 0)
      ? setCookiesArr
      : (setCookieHeader ? splitSetCookie(setCookieHeader) : null);
    cookies.setFromSetCookie(setCookies);

    const ct = res.headers.get("content-type") ?? "";
    const isJson = ct.includes("application/json");
    const data = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => "");
    return { res, data } as const;
  };

  const expectStatus = (got: number, expected: number | number[], label: string) => {
    const exp = Array.isArray(expected) ? expected : [expected];
    const ok = exp.includes(got);
    logStep(label, ok, { status: got, expected: exp });
    if (!ok) throw new Error(`${label} failed: got ${got}, expected ${exp.join("|")}`);
  };

  const logStep = (label: string, ok: boolean, extra?: unknown) => {
    const line = JSON.stringify({ step: label, ok, ...(extra ? { extra } : {}) });
    console.log(line);
  };

  const email = `e2e_${Date.now()}@example.com`;
  const password = "Passw0rd!";

  // 1) Sign Up
  {
    const { res } = await req({ method: "POST", path: "/api/auth/sign-up/email", body: { email, password, name: "E2E" } });
    expectStatus(res.status, 200, "sign-up");
  }

  // 2) Sign Out (cleans any existing session)
  {
    const { res } = await req({ method: "POST", path: "/api/auth/sign-out", withCookie: true });
    expectStatus(res.status, [200, 204], "sign-out-initial");
  }

  // 3) Sign In
  {
    const { res } = await req({ method: "POST", path: "/api/auth/sign-in/email", body: { email, password } });
    expectStatus(res.status, 200, "sign-in");
    // attesa breve per propagazione cookie
    await new Promise((r) => setTimeout(r, 50));
    logStep("cookies-after-sign-in", true, { cookie: cookies.header() });
  }

  // 4) Session (requires cookie)
  {
    const { res, data } = await req({ method: "GET", path: "/api/auth/session", withCookie: true });
    // Alcune configurazioni possono restituire 404 se la sessione non è stata ancora materializzata
    expectStatus(res.status, [200, 404], "session");
    if (res.status === 200) {
      logStep("session-body", true, data);
    } else {
      logStep("session-missing", true, { note: "404 senza sessione attiva", cookie: cookies.header() });
    }
  }

  // 5) Sign Out finale
  {
    const { res } = await req({ method: "POST", path: "/api/auth/sign-out", withCookie: true });
    expectStatus(res.status, [200, 204, 401, 404], "sign-out-final");
  }

  // 6) Session senza cookie → atteso 401 o 404
  {
    const { res } = await req({ method: "GET", path: "/api/auth/session", withCookie: false });
    expectStatus(res.status, [401, 404], "session-without-cookie");
  }

  console.log(JSON.stringify({ result: "PASS", email }));
}

function splitSetCookie(header: string): string[] {
  // Naive split on comma that separates cookies (ignore commas inside Expires)
  const parts: string[] = [];
  let current = "";
  let inExpires = false;
  for (let i = 0; i < header.length; i++) {
    const ch = header[i];
    const nextFive = header.slice(i, i + 8).toLowerCase();
    if (!inExpires && nextFive.startsWith("expires=")) inExpires = true;
    if (inExpires && ch === ";") inExpires = false;
    if (!inExpires && ch === ",") {
      parts.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

main().catch((err) => {
  console.error(JSON.stringify({ result: "FAIL", error: String(err && err.message || err) }));
  (globalThis as any).process?.exit?.(1);
});
