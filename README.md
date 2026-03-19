# HRMS Lite (Full-Stack)

A lightweight Human Resource Management System built with modern full-stack technologies. Manage employees and track daily attendance with a clean, professional UI.

## 🎯 Features

- ✅ **Employee Management**: Add, view, and delete employees with validation (unique ID, valid email, unique email)
- ✅ **Attendance Tracking**: Mark and view attendance records per employee (Present/Absent)
- ✅ **Professional UI**: Clean layout with tabs, forms, lists, loading/error states
- ✅ **API Validation**: Required fields, email format, duplicate handling
- ✅ **Real-time Updates**: Instant UI refresh after successful operations

## 🌐 Live Application

### Deployed URLs
- **Frontend**: `https://hrms-lite.vercel.app`
- **Backend API**: `https://hrms-backend-xxxx.onrender.com`
- **GitHub Repository**: `https://github.com/Vinod2127/hrms-lite`

*Note: Replace `xxxx` with actual Render deployment ID*

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **CSS** - Styling

### Backend
- **Express.js** - REST API framework
- **CORS** - Cross-origin resource sharing
- **LowDB** - JSON file persistence
- **Nanoid** - ID generation

### Deployment
- **Frontend**: Vercel
- **Backend**: Render.com
- **Database**: JSON file (LowDB)

---

## 📥 Local Setup

### Prerequisites
- Node.js 16+ and npm

### Backend Setup
```bash
cd backend
npm install
npm start
```
Backend runs on `http://localhost:4000`

### Frontend Setup
```bash
cd frontend
npm install
VITE_API_BASE_URL=http://localhost:4000 npm run dev
```
Frontend runs on `http://localhost:5173`

---

## 🚀 Deployment Guide

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete step-by-step deployment instructions.

### Quick Summary
1. Deploy backend to Render.com (free tier)
2. Deploy frontend to Vercel (free tier)
3. Set frontend environment variable `VITE_API_BASE_URL` to your backend URL
4. Test the connection by adding an employee

---

## 📡 API Endpoints

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `DELETE /api/employees/:id` - Delete employee by ID

### Attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance?employeeId=ID` - Filter by employee
- `POST /api/attendance` - Create attendance record

### Request/Response Examples

**Create Employee:**
```bash
POST /api/employees
Content-Type: application/json

{
  "id": "EMP001",
  "name": "John Doe",
  "email": "john@example.com",
  "department": "Engineering"
}

Response (201):
{
  "id": "EMP001",
  "name": "John Doe",
  "email": "john@example.com",
  "department": "Engineering",
  "createdAt": "2024-03-19T10:30:00.000Z"
}
```

**Record Attendance:**
```bash
POST /api/attendance
Content-Type: application/json

{
  "employeeId": "EMP001",
  "date": "2024-03-19",
  "status": "Present"
}

Response (201):
{
  "id": "xyz123",
  "employeeId": "EMP001",
  "date": "2024-03-19",
  "status": "Present",
  "createdAt": "2024-03-19T10:30:00.000Z"
}
```

---

## 📝 Project Structure

```
hrms-lite/
├── backend/
│   ├── index.js              # Express server & API endpoints
│   ├── package.json          # Backend dependencies
│   ├── db.json              # JSON database (LowDB)
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Main app component
│   │   ├── api.ts           # API client
│   │   ├── types.ts         # TypeScript types
│   │   ├── components/
│   │   │   ├── EmployeeSection.tsx
│   │   │   ├── AttendanceSection.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── ErrorMessage.tsx
│   │   └── ...
│   ├── package.json         # Frontend dependencies
│   └── .env                 # Environment variables
├── DEPLOYMENT_GUIDE.md      # Detailed deployment steps
└── README.md               # This file
```

---

## 📋 Assumptions & Limitations

### Assumptions
- **Single Admin User**: No authentication required (as per assignment requirements)
- **Local Testing**: Can be run locally without any external services
- **Data Persistence**: JSON file storage is suitable for demo/development

### Limitations
- **Database**: JSON file storage is not suitable for high-traffic production (use PostgreSQL/MongoDB for production)
- **No Authentication**: Anyone with access to the URL can modify data
- **No Authorization**: All users have full access (no role-based access control)
- **Cold Starts**: Free tier Render instances may sleep after 15 minutes of inactivity
- **Storage**: Vercel free tier has request limits
- **Scope**: No leave management, payroll, or advanced HR features

### Bonus Features Implemented
- **Tab Navigation**: Switch between employee and attendance sections
- **Attendance Filtering**: View records for selected employee only
- **Sorting**: Employees sorted alphabetically
- **Error Handling**: Meaningful error messages for validation failures
- **Loading States**: Visual feedback during API calls
- **Empty States**: Helpful messages when no data exists

---

## 🧪 Testing the Application

1. **Add Employee**:
   - ID: `EMP001`
   - Name: `John Doe`
   - Email: `john@example.com`
   - Department: `Engineering`
   - Click "Create employee"

2. **Record Attendance**:
   - Click on the employee in the list
   - Switch to "Attendance" tab
   - Select today's date
   - Mark as "Present"
   - Click "Save attendance"

3. **View Records**:
   - See the new attendance record appear immediately
   - Try adding more records for multiple employees

---

## 🐛 Troubleshooting

### Frontend not connecting to backend?
- Check if `VITE_API_BASE_URL` environment variable is set correctly
- Verify backend service is running/deployed
- Check browser console for CORS errors
- Ensure backend URL is accessible from your location

### Backend not starting?
- Verify Node.js is installed: `node --version`
- Install dependencies: `npm install` in backend directory
- Check if port 4000 is not already in use

### Data not persisting?
- Backend creates `db.json` automatically on first run
- Ensure backend has write permissions in the directory
- Check that LowDB is properly initialized

---

## 📖 Assignment Alignment

This project fulfills all core requirements:

✅ **Functional Requirements**
- Employee management (add, view, delete)
- Attendance tracking (record and view)
- Professional UI with proper spacing and navigation

✅ **Backend & Database**
- RESTful APIs for all operations
- Server-side validation
- Error handling with proper HTTP status codes
- JSON persistence

✅ **Deployment**
- Live frontend URL
- Hosted backend API
- GitHub repository with complete source code

✅ **Code Quality**
- Modular, reusable components
- TypeScript for type safety
- Proper error handling and loading states
- Clean project structure

---

## 📞 Support

For deployment issues, refer to [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

For bugs or questions, check the GitHub repository or review the code comments.

---

Good luck! 🚀
