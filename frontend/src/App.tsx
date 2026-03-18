import { useEffect, useMemo, useState } from 'react'
import './App.css'
import type { Attendance, Employee } from './types'
import * as api from './api'
import EmployeeSection from './components/EmployeeSection'
import AttendanceSection from './components/AttendanceSection'

type View = 'employees' | 'attendance'

export default function App() {
  const [view, setView] = useState<View>('employees')
  const [employees, setEmployees] = useState<Employee[]>([])
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)

  const selectedEmployeeName = useMemo(() => {
    const e = employees.find((emp) => emp.id === selectedEmployee)
    return e ? e.name : null
  }, [employees, selectedEmployee])

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (selectedEmployee) {
      loadAttendance(selectedEmployee)
    }
  }, [selectedEmployee])

  async function loadData() {
    try {
      setLoading(true)
      setError(null)
      const [employeesList, attendanceList] = await Promise.all([api.getEmployees(), api.getAttendance()])
      setEmployees(employeesList)
      setAttendance(attendanceList)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  async function loadAttendance(employeeId?: string) {
    try {
      setError(null)
      const attendanceList = await api.getAttendance(employeeId)
      setAttendance(attendanceList)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load attendance')
    }
  }

  async function handleCreateEmployee(payload: { id: string; name: string; email: string; department: string }) {
    const created = await api.createEmployee(payload)
    setEmployees((prev) => [...prev, created])
  }

  async function handleDeleteEmployee(id: string) {
    await api.deleteEmployee(id)
    setEmployees((prev) => prev.filter((e) => e.id !== id))
    if (selectedEmployee === id) {
      setSelectedEmployee(null)
      await loadAttendance()
    }
  }

  async function handleCreateAttendance(payload: { employeeId: string; date: string; status: 'Present' | 'Absent' }) {
    const record = await api.createAttendance(payload)
    setAttendance((prev) => [record, ...prev])
  }

  const statusMessage = useMemo(() => {
    if (loading) return 'Loading…'
    if (error) return `Error: ${error}`
    return selectedEmployee ? `Showing attendance for ${selectedEmployeeName}` : 'Showing all attendance records'
  }, [error, loading, selectedEmployee, selectedEmployeeName])

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <h1>HRMS Lite</h1>
          <p className="subtitle">Employee & Attendance management</p>
        </div>

        <div className="tabs" role="tablist">
          <button
            type="button"
            className={`tab ${view === 'employees' ? 'active' : ''}`}
            onClick={() => setView('employees')}
            role="tab"
            aria-selected={view === 'employees'}
          >
            Employees
          </button>
          <button
            type="button"
            className={`tab ${view === 'attendance' ? 'active' : ''}`}
            onClick={() => setView('attendance')}
            role="tab"
            aria-selected={view === 'attendance'}
          >
            Attendance
          </button>
        </div>
      </header>

      <main className="main">
        <div className="status">{statusMessage}</div>

        {loading ? (
          <div className="panel">
            <p>Loading data…</p>
          </div>
        ) : view === 'employees' ? (
          <EmployeeSection
            employees={employees}
            onCreate={handleCreateEmployee}
            onDelete={handleDeleteEmployee}
            onSelectEmployee={(id) => {
              setSelectedEmployee(id)
              setView('attendance')
            }}
            selectedEmployeeId={selectedEmployee ?? undefined}
          />
        ) : (
          <AttendanceSection
            employees={employees}
            attendance={attendance}
            onCreateAttendance={handleCreateAttendance}
            selectedEmployeeId={selectedEmployee}
          />
        )}
      </main>

      <footer className="footer">
        <p>Tip: Make sure the backend server is running at <code>http://localhost:4000</code>.</p>
      </footer>
    </div>
  )
}
