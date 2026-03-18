export type AttendanceStatus = 'Present' | 'Absent'

export interface Employee {
  id: string
  name: string
  email: string
  department: string
  createdAt: string
}

export interface Attendance {
  id: string
  employeeId: string
  date: string // ISO date string (YYYY-MM-DD)
  status: AttendanceStatus
  createdAt: string
}
