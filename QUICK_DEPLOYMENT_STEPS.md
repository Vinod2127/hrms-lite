# 🚀 Quick Deployment Steps - HRMS Lite

Follow these steps to deploy your HRMS Lite application with backend and frontend connected.

---

## ⚡ STEP 1: Prepare Code (2 minutes)

```bash
cd e:\vinod\hrms-lite

# Add all changes
git add .

# Commit
git commit -m "Prepare for deployment - add env files and deployment guides"

# Push to GitHub
git push origin main
```

---

## ⚡ STEP 2: Deploy Backend to Render.com (5 minutes)

### 2.1 Go to Render.com
1. Open https://render.com
2. Sign in with GitHub
3. Click **"New"** → **"Web Service"**
4. Select your `hrms-lite` repo
5. Click **"Connect"**

### 2.2 Configure Service
Fill in:
- **Name**: `hrms-backend`
- **Environment**: `Node.js`
- **Branch**: `main`
- **Build Command**: `npm install` (press Tab after typing)
- **Start Command**: `npm start`
- **Instance Type**: Select `Free`

### 2.3 Deploy
- Click **"Create Web Service"**
- Wait 2-3 minutes for deployment ✅
- **Copy your backend URL** like: `https://hrms-backend-xxxx.onrender.com`

### 2.4 Test Backend
Open in browser: `https://hrms-backend-xxxx.onrender.com/api/employees`

You should see: `[]` (empty array)

---

## ⚡ STEP 3: Deploy Frontend to Vercel (5 minutes)

### 3.1 Go to Vercel
1. Open https://vercel.com
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**
4. Click **"Import Git Repository"**
5. Search for `hrms-lite` and click **"Import"**

### 3.2 Set Project Settings
1. Look for **"Root Directory"** dropdown
2. Select: `frontend`
3. Click **"Deploy"** button

### 3.3 Add Environment Variable (IMPORTANT!)
1. Setup fails? Don't worry! Go to **"Settings"** tab
2. Click **"Environment Variables"** in left menu
3. Add new variable:
   ```
   Name:  VITE_API_BASE_URL
   Value: https://hrms-backend-xxxx.onrender.com
   ```
   *(Use your actual Render backend URL)*
4. Select all environments (Production, Preview, Development)
5. Click **"Save"**

### 3.4 Redeploy Frontend
1. Go to **"Deployments"** tab
2. Find the failed deployment
3. Click the "..." menu → **"Redeploy"**
4. Wait for deployment to complete ✅

### 3.5 Get Your Frontend URL
- You'll see your Vercel URL: `https://hrms-lite-xxxx.vercel.app`

---

## ✅ STEP 4: Test Full Integration (2 minutes)

1. **Open Frontend URL** in browser: `https://hrms-lite-xxxx.vercel.app`

2. **Add An Employee**:
   - Employee ID: `EMP001`
   - Full Name: `John Doe`
   - Email: `john@example.com`
   - Department: `Engineering`
   - Click **"Create employee"** button

3. **Check if it worked**:
   - ✅ Employee appears in the list
   - ✅ No error messages
   - Backend successfully received the data

4. **Test Attendance**:
   - Click on the employee
   - Switch to "Attendance" tab
   - Select today's date
   - Mark as "Present"
   - Click "Save attendance"
   - See record appear in list

---

## 🎉 Success Checklist

- [ ] Backend deployed to Render (URL noted)
- [ ] Frontend deployed to Vercel (URL noted)
- [ ] Frontend environment variable set to backend URL
- [ ] Can add employee through deployed app
- [ ] Data appears in the list
- [ ] Attendance tracking works
- [ ] No error messages in browser console

---

## 📤 Final URLs to Share

Once everything works, you have:

✅ **Live Application**: `https://hrms-lite-xxxx.vercel.app`
✅ **Backend API**: `https://hrms-backend-xxxx.onrender.com`
✅ **GitHub Repository**: `https://github.com/Vinod2127/hrms-lite`

---

## 🆘 Troubleshooting

### Frontend Blank/Not Loading?
- **Check**: Browser console (F12 → Console tab)
- **Look for**: Red errors about "Failed to fetch"
- **Fix**: Make sure `VITE_API_BASE_URL` env var is set in Vercel
- **Action**: Re-deploy after fixing env var

### Can't Add Employee - Shows Error?
- **Check**: Is your backend URL correct in frontend env var?
- **Test**: Open backend URL directly in browser
- **If 404**: Backend not deployed correctly
- **Action**: Check Render logs for errors

### Backend URL Shows Blank Page?
- **Normal**: Render free tier may need ~20 seconds first load
- **Try Again**: Refresh the page
- **Check**: Go back to Render dashboard, check service logs

### "Deployed but frontend can't connect"?
- **Reason**: Environment variable not set before deployment
- **Fix**: Add `VITE_API_BASE_URL` in Vercel Settings
- **Then**: Click "Redeploy" on failed deployment

---

## 💾 Push These Files to GitHub

Make sure these are in your repo:
- ✅ `frontend/.env` (local development)
- ✅ `frontend/.env.production` (production)
- ✅ `backend/package.json`
- ✅ `backend/index.js`
- ✅ `README.md` (updated)
- ✅ `DEPLOYMENT_GUIDE.md`

---

## ⏱️ Total Time: ~15 minutes

You now have a fully deployed HRMS application! 🎊

For detailed info, see `DEPLOYMENT_GUIDE.md`.
