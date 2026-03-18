import { useMemo, useState } from 'react'
import type { Attendance, Employee } from '../types'

interface Props {
  employees: Employee[]
  attendance: Attendance[]
  onCreateAttendance: (payload: { employeeId: string; date: string; status: 'Present' | 'Absent' }) => Promise<void>
  selectedEmployeeId: string | null
}

const STATUS = ['Present', 'Absent'] as const

export default function AttendanceSection({
  employees,
  attendance,
  onCreateAttendance,
  selectedEmployeeId,
}: Props) {
  const [form, setForm] = useState({ employeeId: selectedEmployeeId ?? '', date: '', status: 'Present' as 'Present' | 'Absent' })
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const sortedEmployees = useMemo(() => [...employees].sort((a, b) => a.name.localeCompare(b.name)), [employees])
  const filteredAttendance = useMemo(() => {
    if (!selectedEmployeeId) return attendance
    return attendance.filter((rec) => rec.employeeId === selectedEmployeeId)
  }, [attendance, selectedEmployeeId])

  const handleChange = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.value
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    try {
      setSaving(true)
      await onCreateAttendance(form)
      setForm((prev) => ({ ...prev, date: '' }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="panel">
      <header className="panel__header">
        <h2>Attendance</h2>
        <p className="muted">Record and view attendance per employee.</p>
      </header>

      <div className="grid">
        <form className="card" onSubmit={handleSubmit} aria-label="Record attendance">
          <h3>Record attendance</h3>
          <label>
            Employee
            <select value={form.employeeId} onChange={handleChange('employeeId')} required>
              <option value="">Select employee</option>
              {sortedEmployees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Date
            <input type="date" value={form.date} onChange={handleChange('date')} required />
          </label>

          <label>
            Status
            <select value={form.status} onChange={handleChange('status')}>
              {STATUS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          {error ? <div className="formError">{error}</div> : null}
          <button className="button" disabled={saving} type="submit">
            {saving ? 'Saving…' : 'Save attendance'}
          </button>
        </form>

        <div className="card">
          <h3>Records</h3>
          {employees.length === 0 ? (
            <p className="muted">Add employees first to start tracking attendance.</p>
          ) : filteredAttendance.length === 0 ? (
            <p className="muted">No attendance records yet.</p>
          ) : (
            <ul className="table">
              {filteredAttendance.map((record) => {
                const employee = employees.find((e) => e.id === record.employeeId)
                return (
                  <li key={record.id} className="table-row">
                    <div className="table-cell">
                      <div className="table-title">{employee?.name ?? record.employeeId}</div>
                      <div className="table-subtitle">{record.date}</div>
                    </div>
                    <div className="tag">{record.status}</div>
                  </li>
                )
              })}
            </ul>
          )}

          <div className="hint">
            <p>
              Tip: click an employee in the left panel to focus attendance for that person.
            </p>
          </div>
        </div>
      </div>

      <div className="hint">
        <p>
          Filter: <strong>{selectedEmployeeId ? 'Showing selected employee' : 'Showing all employees'}</strong>
        </p>
      </div>
    </section>
  )
}
