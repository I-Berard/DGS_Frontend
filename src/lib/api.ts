const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token')
  const headers = new Headers(options.headers)
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const res = await fetch(`${API_BASE}${path}`, {
    headers,
    credentials: 'include',
    ...options,
  })
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'API request failed')
  }
  return res.json()
}

export async function login(data: { username: string, email: string, password: string }): Promise<any> {
  return request(`/users/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function signup(data: { name: string; username: string; sandai_email: string; personal_email: string; password: string; role: string }): Promise<any> {
  return request(`/users/signup`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function fetchProjects(set: string | null): Promise<any> {
  return request(`/projects/myprojects/${set}`)
}
