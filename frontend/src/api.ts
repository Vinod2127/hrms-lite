import type { Attendance, Employee, AttendanceStatus } from './types'

const BASE = (import.meta.env.VITE_API_BASE_URL as string) || '/api'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  const contentType = res.headers.get('content-type')
  const body = contentType?.includes('application/json') ? await res.json() : null

  if (!res.ok) {
    const message = body?.message || res.statusText || 'Unknown error'
    throw new Error(message)
  }

  return body as T
}

export function getEmployees() {
  return request<Employee[]>('/employees')
}

export function createEmployee(payload: { id: string; name: string; email: string; department: string }) {
  return request<Employee>('/employees', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function deleteEmployee(id: string) {
  return request<void>(`/employees/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })
}

export function getAttendance(employeeId?: string) {
  const query = employeeId ? `?employeeId=${encodeURIComponent(employeeId)}` : ''
  return request<Attendance[]>(`/attendance${query}`)
}

export function createAttendance(payload: { employeeId: string; date: string; status: AttendanceStatus }) {
  return request<Attendance>('/attendance', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
