# 🚀 Railway Deployment Guide

## Prerequisites
- MongoDB Atlas account (free tier): https://www.mongodb.com/cloud/atlas/register
- Railway account (free tier): https://railway.app

## Step 1: Setup MongoDB Atlas (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a FREE M0 cluster:
   - Cloud Provider: AWS
   - Region: Choose closest to you
   - Cluster Name: seasoncounter
3. Create Database User:
   - Username: `seasonuser`
   - Password: (generate strong password, save it!)
4. Network Access → Add IP Address:
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is needed for Railway to connect
5. Get Connection String:
   - Click "Connect" → "Connect your application"
   - Copy the connection string:
   ```
   mongodb+srv://seasonuser:<password>@cluster.xxxxx.mongodb.net/seasoncounter?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password

## Step 2: Deploy to Railway (3 minutes)

### Option A: Deploy from GitHub (Recommended)

1. Go to https://railway.app and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository: `YeraldoCode/seasoncounter`
4. Railway will detect it's a Node.js project
5. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `node server.js` (auto-detected)

### Option B: Deploy with Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
cd backend
railway init

# Deploy
railway up
```

## Step 3: Configure Environment Variables in Railway

In Railway dashboard → Variables, add:

```env
PORT=5000
MONGODB_URI=mongodb+srv://seasonuser:YOUR_PASSWORD@cluster.xxxxx.mongodb.net/seasoncounter?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=https://your-site.netlify.app
NODE_ENV=production
```

**IMPORTANT:** Replace:
- `YOUR_PASSWORD` with your MongoDB Atlas password
- `your-site.netlify.app` with your actual Netlify URL

## Step 4: Get Your Backend URL

After deployment, Railway will give you a URL like:
```
https://seasoncounter-production.up.railway.app
```

**Copy this URL!** You'll need it for the next step.

## Step 5: Update Netlify Environment Variable

1. Go to your Netlify dashboard
2. Site configuration → Environment variables
3. Edit `VITE_API_URL`:
   ```
   VITE_API_URL=https://seasoncounter-production.up.railway.app
   ```
4. Click "Save"
5. Go to Deploys → Trigger deploy → "Clear cache and deploy site"

## Step 6: Seed Your Database

Once backend is deployed, seed the events:

```bash
# Update seedEvents.js to use production MongoDB
# Then run:
MONGODB_URI="your-atlas-connection-string" node seedEvents.js
```

Or use Railway CLI:
```bash
railway run node seedEvents.js
```

## ✅ Verification

Test your backend:
```bash
curl https://your-backend-url.railway.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "timestamp": "2025-12-10T...",
  "uptime": 123.45
}
```

## 🔍 Troubleshooting

### MongoDB Connection Failed
- Check your IP whitelist in MongoDB Atlas (should be 0.0.0.0/0)
- Verify connection string format
- Ensure password doesn't have special characters (or URL-encode them)

### CORS Errors
- Make sure `FRONTEND_URL` in Railway matches your Netlify URL exactly
- Include `https://` in the URL

### Backend Won't Start
- Check Railway logs: Dashboard → Deployments → View logs
- Verify all environment variables are set
- Check that `server.js` exists in backend folder

## 💰 Cost (Free Tier Limits)

**Railway Free Tier:**
- $5 credit per month
- Usually enough for small apps
- Auto-sleeps after 5 min inactivity (wakes on request)

**MongoDB Atlas Free Tier:**
- 512 MB storage
- Shared RAM
- Plenty for your app!

## 🎉 Next Steps

After backend is deployed:
1. ✅ Update `VITE_API_URL` in Netlify
2. ✅ Redeploy frontend on Netlify
3. ✅ Test your app end-to-end
4. ✅ Seed your database with events
5. 🎯 Ready for AdSense when you get traffic!

---

**Need help?** Railway has great docs: https://docs.railway.app
