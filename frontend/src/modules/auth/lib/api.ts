// src/modules/auth/lib/api.ts

const BASE_URL = (import.meta as any)?.env?.VITE_BACKEND_URL?.replace(/\/$/, "") || "http://localhost:4000";

type Json = Record<string, any> | undefined;

async function request<T>(path: string, options: RequestInit & { json?: Json } = {}): Promise<{ status: number; data: T | undefined }> {
  const headers: Record<string, string> = { Accept: "application/json" };
  let body: BodyInit | undefined;
  if (options.json !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.json);
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || (options.json ? "POST" : "GET"),
    headers: { ...headers, ...(options.headers as any) },
    body,
    credentials: "include",
    redirect: "manual",
    mode: "cors",
  });
  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");
  const data = (isJson ? await res.json().catch(() => undefined) : undefined) as T | undefined;
  return { status: res.status, data };
}

export async function apiSignUpEmail(payload: { email: string; password: string; name?: string }) {
  return request(`/api/auth/sign-up/email`, { method: "POST", json: payload });
}

export async function apiSignInEmail(payload: { email: string; password: string }) {
  return request(`/api/auth/sign-in/email`, { method: "POST", json: payload });
}

export async function apiSignOut() {
  return request(`/api/auth/sign-out`, { method: "POST", json: {} });
}

export async function apiSession<T = any>() {
  return request<T>(`/api/auth/session`, { method: "GET" });
}
