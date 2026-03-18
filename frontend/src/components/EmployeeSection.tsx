import { useMemo, useState } from 'react'
import type { Employee } from '../types'

interface Props {
  employees: Employee[]
  onCreate: (payload: { id: string; name: string; email: string; department: string }) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onSelectEmployee: (id: string) => void
  selectedEmployeeId?: string
}

export default function EmployeeSection({ employees, onCreate, onDelete, onSelectEmployee, selectedEmployeeId }: Props) {
  const [form, setForm] = useState({ id: '', name: '', email: '', department: '' })
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const sorted = useMemo(() => [...employees].sort((a, b) => a.name.localeCompare(b.name)), [employees])

  const handleChange = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    try {
      setSaving(true)
      await onCreate(form)
      setForm({ id: '', name: '', email: '', department: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="panel">
      <header className="panel__header">
        <h2>Employee management</h2>
        <p className="muted">Add, view, and remove employees.</p>
      </header>

      <div className="grid">
        <form className="card" onSubmit={handleSubmit} aria-label="Add employee form">
          <h3>Add employee</h3>
          <label>
            Employee ID
            <input value={form.id} onChange={handleChange('id')} required />
          </label>
          <label>
            Full name
            <input value={form.name} onChange={handleChange('name')} required />
          </label>
          <label>
            Email address
            <input value={form.email} onChange={handleChange('email')} required type="email" />
          </label>
          <label>
            Department
            <input value={form.department} onChange={handleChange('department')} required />
          </label>

          {error ? <div className="formError">{error}</div> : null}
          <button className="button" type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Create employee'}
          </button>
        </form>

        <div className="card">
          <h3>Employees</h3>
          {sorted.length === 0 ? (
            <p className="muted">No employees yet. Add one to get started.</p>
          ) : (
            <ul className="table">
              {sorted.map((employee) => (
                <li
                  key={employee.id}
                  className={`table-row ${selectedEmployeeId === employee.id ? 'is-selected' : ''}`}
                >
                  <button className="table-cell" type="button" onClick={() => onSelectEmployee(employee.id)}>
                    <div className="table-title">{employee.name}</div>
                    <div className="table-subtitle">{employee.department}</div>
                    <div className="table-caption">{employee.email}</div>
                  </button>
                  <button className="button button--small" type="button" onClick={() => onDelete(employee.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
