const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include',
    ...options,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || res.statusText)
  }
  return res.json() as Promise<T>
}

export function login(data: { username: string, email: string, password: string }) {
  return request<{ token?: string; user?: unknown }>(`/users/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function signup(data: { name: string; username: string; sandai_email: string; personal_email: string; password: string; role: string }) {
  return request<{ user: unknown }>(`/users/signup`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
