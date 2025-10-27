// Frontend/src/shared/lib/http.ts
const BASE_URL = (import.meta as any)?.env?.VITE_BACKEND_URL?.replace(/\/$/, "") || "http://localhost:4000"

type Json = Record<string, any> | undefined

async function request<T>(
  path: string,
  options: RequestInit & { json?: Json } = {}
): Promise<{ status: number; data: T | undefined }> {
  const headers: Record<string, string> = { Accept: "application/json" }
  let body: BodyInit | undefined
  if (options.json !== undefined) {
    headers["Content-Type"] = "application/json"
    body = JSON.stringify(options.json)
  }
  
  const url = `${BASE_URL}${path}`
  console.log('[HTTP] Request:', {
    url,
    method: options.method || (options.json ? "POST" : "GET"),
    headers,
    body: options.json,
    credentials: "include"
  })
  
  const res = await fetch(url, {
    method: options.method || (options.json ? "POST" : "GET"),
    headers: { ...headers, ...(options.headers as any) },
    body,
    credentials: "include",
    redirect: "manual",
    mode: "cors",
  })
  
  const ct = res.headers.get("content-type") || ""
  const isJson = ct.includes("application/json")
  const data = (isJson ? await res.json().catch(() => undefined) : undefined) as T | undefined
  
  console.log('[HTTP] Response:', {
    url,
    status: res.status,
    statusText: res.statusText,
    contentType: ct,
    data,
    cookies: document.cookie
  })
  
  return { status: res.status, data }
}

export { BASE_URL, request }
