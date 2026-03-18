# HRMS Lite (Full-Stack)

This workspace contains a **full-stack HRMS Lite** application with:

- **Frontend:** React + Vite + TypeScript
- **Backend:** Express + lowdb (JSON persistence)

## 📦 Running locally

### 1) Start the backend

```bash
cd backend
npm install
npm run start
```

The backend serves REST APIs on `http://localhost:4000/api`.

### 2) Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the app at `http://localhost:5173`.

---

## ✅ Features implemented

- Employee CRUD (create, list, delete)
- Attendance tracking (create and view records)
- API validation (required fields, email format, uniqueness)
- Frontend UI (tabs, forms, lists, loading / error states)

---

## 🔧 Deployment notes

To deploy, deploy the backend to a service like Render/Railway and set the frontend's API base URL (via `VITE_API_BASE_URL`) to the deployed backend endpoint.

---

## 🚀 Deployment

### Live Application URL
[Add your deployed frontend URL here after deployment, e.g., https://your-app.vercel.app]

### GitHub Repository Link
[Add your GitHub repo URL here, e.g., https://github.com/yourusername/hrms-lite]

### Hosted Backend API
[Add your deployed backend API URL here, e.g., https://your-backend.onrender.com/api]

---

## 📝 Assumptions and Limitations

- Single admin user (no authentication required as per assignment).
- Data persists via JSON file (lowdb); suitable for demo but not high-traffic production.
- No advanced HR features like leave management, payroll, or user roles.
- Frontend assumes backend is accessible via the configured API base URL.
- Deployment uses free tiers of hosting services (may have limitations like cold starts).

---

## 🧠 Assignment alignment

This project implements the core requirements from the assessment:

- Employee management with unique ID + email validation
- Attendance management per employee
- RESTful API with sensible HTTP status codes
- Clean, professional UI with loading/empty/error states
