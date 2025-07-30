# Deployment Guide for Marcel's Portfolio

## Current Issue
Your app is deployed to Netlify, which only hosts static files (frontend). Your backend API server needs to be deployed separately to a service that supports Node.js.

## Quick Fix Steps

### 1. Deploy Backend to Render

1. **Go to [Render.com](https://render.com)** and create a free account
2. **Connect your GitHub repository**
3. **Create a new Web Service** with these settings:
   - **Name**: `marcel-portfolio-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Auto-Deploy**: `Yes`

4. **Add Environment Variables** in Render dashboard:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

### 2. Update Frontend Configuration

1. **Get your Render backend URL** (e.g., `https://marcel-portfolio-backend.onrender.com`)
2. **Update the environment file**:
   - Edit `client/.env.production`
   - Replace `VITE_BACKEND_URL=https://your-backend-app.onrender.com` with your actual URL

### 3. Redeploy Frontend

1. **Commit changes**: `git add . && git commit -m "Configure backend URL"`
2. **Push to GitHub**: `git push`
3. **Netlify will auto-redeploy** your frontend with the new backend configuration

## Alternative: Deploy Full-Stack to Render

If you prefer everything on one platform:

1. **Deploy both frontend and backend to Render**
2. **Use the render.yaml file** (already created) for automatic configuration
3. **Update Netlify or switch to Render entirely**

## Testing After Deployment

1. **Backend health check**: Visit `https://your-backend-url.onrender.com/api`
2. **Frontend signin**: Try signing in with:
   - Email: `admin@portfolio.com`
   - Password: `admin123`

## Current Setup Summary

- ✅ **Frontend**: React app on Netlify
- ❌ **Backend**: Needs deployment to Render/Railway/Heroku
- ✅ **Database**: MongoDB Atlas (already configured)
- ✅ **Code**: Ready for deployment with render.yaml

The 404 errors will be resolved once the backend is properly deployed and the frontend is configured to use the correct backend URL.
