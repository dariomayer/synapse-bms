// Frontend/src/modules/auth/lib/api.ts
import { request } from "@/shared/lib/http"

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
  return request<T>(`/api/auth/get-session`, { method: "GET" });
}
