# HRMS Lite - Deployment Guide

This guide will help you deploy HRMS Lite to production with the backend and frontend fully connected.

---

## 📋 Deployment Overview

- **Backend**: Render.com (Free Node.js backend)
- **Frontend**: Vercel (Free React/Vite hosting)
- **Database**: LowDB (JSON file persistence)

---

## 🚀 STEP 1: Deploy Backend to Render.com

### 1.1 Create Render Account
1. Go to https://render.com
2. Click "Get Started" → Sign up with GitHub
3. Authorize Render to access your repositories

### 1.2 Connect GitHub Repository
1. In Render dashboard, click "New" → "Web Service"
2. Select "Build and deploy from a Git repository"
3. Search for and select your repository: `hrms-lite`
4. Click "Connect"

### 1.3 Configure Backend Service
Fill in the following details:

| Field | Value |
|-------|-------|
| **Name** | `hrms-backend` |
| **Environment** | `Node.js` |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 1.4 Deploy Backend
1. Click "Create Web Service"
2. Wait for deployment (2-3 minutes)
3. You'll get a URL like: `https://hrms-backend-xxxx.onrender.com`
4. Note this URL (you'll need it for the frontend)

### 1.5 Verify Backend is Running
Test your backend:
```
https://hrms-backend-xxxx.onrender.com/api/employees
```

You should get an empty array `[]`

---

## 🚀 STEP 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up" → Select "Continue with GitHub"
3. Authorize and complete signup

### 2.2 Import Your Project
1. In Vercel dashboard, click "Add New..." → "Project"
2. Click "Import Git Repository"
3. Search for `hrms-lite` and click "Import"

### 2.3 Configure Frontend Settings

**Root Directory**: Select `frontend`

**Build Settings**:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.4 Add Environment Variable

This is **CRITICAL** - the frontend needs to know your backend URL.

1. Click "Environment Variables"
2. Add this variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://hrms-backend-xxxx.onrender.com` (use your actual Render backend URL)
   - **Environments**: Select all (Production, Preview, Development)

3. Click "Save"

### 2.5 Deploy Frontend
1. Click "Deploy"
2. Wait for deployment (1-2 minutes)
3. You'll get a URL like: `https://hrms-lite.vercel.app`

### 2.6 Verify Frontend is Running
1. Open your Vercel URL in browser: `https://hrms-lite.vercel.app`
2. The HRMS Lite application should load
3. Try to add an employee to test the backend connection

---

## 🔗 STEP 3: Verify Full Integration

Test the complete flow:

1. **Open Frontend**: `https://hrms-lite.vercel.app`
2. **Add Employee**: Fill in the form with:
   - Employee ID: `EMP001`
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Department: `Engineering`
3. **Verify Save**: Click "Create employee" button
4. **Check Backend**: Should see employee in list

If everything works, your deployment is successful! ✅

---

## 📝 Update README.md

Update your `README.md` with these URLs:

```markdown
## 🌐 Live Application

- **Frontend**: https://hrms-lite.vercel.app
- **Backend API**: https://hrms-backend-xxxx.onrender.com

## 📥 Local Setup

### Backend
```bash
cd backend
npm install
npm start
```
Backend runs on `http://localhost:4000`

### Frontend
```bash
cd frontend
npm install
VITE_API_BASE_URL=http://localhost:4000 npm run dev
```
Frontend runs on `http://localhost:5173`

## 🚀 Deployed Setup

Frontend is hosted on Vercel and automatically connects to the deployed Render backend via the `VITE_API_BASE_URL` environment variable.
```

---

## 🐛 Troubleshooting

### Frontend Not Connecting to Backend
- **Check**: Environment variable `VITE_API_BASE_URL` is set in Vercel
- **Fix**: Re-deploy frontend after updating env var
- **Command**: Go to Vercel → Your Project → Redeploy

### Backend URL Not Working
- **Check**: Render service is still active (not sleeping)
- **Fix**: Visit backend URL directly to wake it up
- **Note**: Free tier Render instances sleep after 15 mins of inactivity

### CORS Error in Browser Console
- **Cause**: Backend doesn't allow requests from frontend domain
- **Status**: Already fixed in backend code (CORS enabled)
- **Action**: Verify backend is receiving requests

### Empty Employee List
- **Expected**: When first deployed, database is empty
- **Action**: Add employees through the form to populate database
- **Note**: Data persists in `db.json` on Render

---

## 📊 Deployed URLs To Share

Once deployed, share these links:

1. **Live Application**: `https://hrms-lite.vercel.app`
2. **GitHub Repository**: `https://github.com/Vinod2127/hrms-lite`
3. **API Endpoint** (for testing): `https://hrms-backend-xxxx.onrender.com/api/employees`

---

## ✅ Deployment Checklist

- [ ] Backend deployed to Render and URL noted
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variable `VITE_API_BASE_URL` set to backend URL
- [ ] Frontend re-deployed after env var change
- [ ] Tested adding employee through deployed app
- [ ] Verified data persists between requests
- [ ] README.md updated with live URLs
- [ ] GitHub repository contains all code

---

## 📞 Support

If deployment fails:
1. Check Render/Vercel logs for errors
2. Verify backend URL is accessible
3. Ensure frontend env var is correctly set
4. Re-deploy after making changes

Good luck! 🚀
