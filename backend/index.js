import express from 'express'
import cors from 'cors'
import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'
import { nanoid } from 'nanoid'

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000

const adapter = new JSONFileSync('db.json')
const db = new LowSync(adapter, { employees: [], attendance: [] })
db.read()

const app = express()
app.use(cors())
app.use(express.json())

const isValidEmail = (value) => {
  return typeof value === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
}

const validateEmployeePayload = (payload) => {
  if (!payload) return 'Payload is required.'
  const { id, name, email, department } = payload
  if (!id || typeof id !== 'string') return 'Employee ID is required.'
  if (!name || typeof name !== 'string') return 'Full name is required.'
  if (!email || typeof email !== 'string') return 'Email is required.'
  if (!isValidEmail(email)) return 'Email is not valid.'
  if (!department || typeof department !== 'string') return 'Department is required.'
  return null
}

app.get('/api/employees', (req, res) => {
  db.read()
  res.json(db.data.employees)
})

app.post('/api/employees', (req, res) => {
  db.read()
  const error = validateEmployeePayload(req.body)
  if (error) return res.status(400).json({ message: error })

  const existsId = db.data.employees.find((e) => e.id === req.body.id)
  if (existsId) return res.status(409).json({ message: 'Employee ID already exists.' })

  const existsEmail = db.data.employees.find((e) => e.email.toLowerCase() === req.body.email.toLowerCase())
  if (existsEmail) return res.status(409).json({ message: 'Email already in use.' })

  const employee = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    department: req.body.department,
    createdAt: new Date().toISOString(),
  }

  db.data.employees.push(employee)
  db.write()

  res.status(201).json(employee)
})

app.delete('/api/employees/:id', (req, res) => {
  db.read()
  const id = req.params.id
  const index = db.data.employees.findIndex((e) => e.id === id)
  if (index === -1) return res.status(404).json({ message: 'Employee not found.' })

  db.data.employees.splice(index, 1)
  db.data.attendance = db.data.attendance.filter((a) => a.employeeId !== id)
  db.write()

  res.status(204).end()
})

app.get('/api/employees/:id/attendance', (req, res) => {
  const employeeId = req.params.id
  db.read()

  const employee = db.data.employees.find((e) => e.id === employeeId)
  if (!employee) return res.status(404).json({ message: 'Employee not found.' })

  const records = db.data.attendance.filter((a) => a.employeeId === employeeId)
  res.json(records)
})

app.get('/api/attendance', (req, res) => {
  db.read()
  const employeeId = req.query.employeeId
  let records = db.data.attendance
  if (employeeId) {
    records = records.filter((a) => a.employeeId === String(employeeId))
  }
  res.json(records)
})

app.post('/api/attendance', (req, res) => {
  db.read()
  const { employeeId, date, status } = req.body || {}
  if (!employeeId || typeof employeeId !== 'string') return res.status(400).json({ message: 'employeeId is required.' })
  if (!date || typeof date !== 'string') return res.status(400).json({ message: 'date is required.' })
  if (!status || !['Present', 'Absent'].includes(status)) {
    return res.status(400).json({ message: 'status must be "Present" or "Absent".' })
  }

  const employee = db.data.employees.find((e) => e.id === employeeId)
  if (!employee) return res.status(404).json({ message: 'Employee not found.' })

  const record = {
    id: nanoid(),
    employeeId,
    date,
    status,
    createdAt: new Date().toISOString(),
  }

  db.data.attendance.push(record)
  db.write()

  res.status(201).json(record)
})

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.listen(PORT, () => {
  console.log(`HRMS backend running: http://localhost:${PORT}`)
})
