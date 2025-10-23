// backend/scripts/test-auth.ts
export {};

async function main() {
  const base = (((globalThis as any).process?.env?.BACKEND_URL) ?? "http://localhost:4000").replace(/\/$/, "");
  const url = `${base}/api/auth/session`;

  // Usa fetch globale disponibile in Node 18+
  const f = (globalThis as any).fetch as typeof fetch;

  const res = await f(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    redirect: "manual",
  });

  const ct = res.headers.get("content-type") ?? "";
  const isJson = ct.includes("application/json");
  const body = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => "");

  // Expect 200 with session if logged in (cookies), or 401/404 depending on configuration without cookies
  if (res.status === 200) {
    console.log("[auth smoke] OK: session available", body ?? "");
    (globalThis as any).process?.exit?.(0);
  }
  if (res.status === 401 || res.status === 404) {
    console.log(`{\n  "status": ${res.status},\n  "message": "[auth smoke] OK: endpoint raggiungibile, nessuna sessione attiva (atteso senza cookie)",\n  "url": "${url}"\n}`);
    (globalThis as any).process?.exit?.(0);
  }

  console.error(`{\n  "status": ${res.status},\n  "message": "[auth smoke] Unexpected status",\n  "url": "${url}",\n  "body": ${JSON.stringify(body)}\n}`);
  (globalThis as any).process?.exit?.(1);
}

main().catch((err) => {
  console.error("[auth smoke] Error:", err);
  (globalThis as any).process?.exit?.(1);
});
