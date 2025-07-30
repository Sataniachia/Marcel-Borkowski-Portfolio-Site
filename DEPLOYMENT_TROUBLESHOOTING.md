# Deployment Troubleshooting Guide

## Common Network Error Fixes for Deployed Applications

### Issue: SignIn Network Error in Production

**Problem:** When deployed, the frontend can't reach `/auth/signin` endpoint.

**Root Cause:** Different environments handle routing differently.

### Solution 1: Updated API Utility (✅ Implemented)

Created `client/src/utils/api.js` that:
- Uses absolute URLs in production
- Handles errors consistently
- Provides better debugging information

### Solution 2: Fixed Server Route Handling (✅ Implemented)

Updated `server.js` to properly exclude auth routes from React catch-all:
```javascript
// Before (WRONG)
app.get('*', (req, res) => {
  if (!req.url.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
  }
});

// After (CORRECT)
app.get('*', (req, res) => {
  if (!req.url.startsWith('/api') && !req.url.startsWith('/auth')) {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
  }
});
```

### Solution 3: Environment Detection

The API utility automatically detects the environment:
- **Development:** Uses Vite proxy (localhost:5173 → localhost:3000)
- **Production:** Uses same domain for API calls

### Deployment Checklist

#### Before Deploying:

1. **Build the React App:**
   ```bash
   cd client
   npm run build
   ```

2. **Verify Environment Variables:**
   ```bash
   # Check .env file has all required variables
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   NODE_ENV=production
   ```

3. **Test Routes Locally:**
   ```bash
   # Start production-like server
   NODE_ENV=production node server.js
   ```

#### Deployment Platform Specific:

**Render.com:**
- Build Command: `npm install && cd client && npm install && npm run build`
- Start Command: `node server.js`
- Environment Variables: Set in Render dashboard

**Railway.app:**
- Automatically detects Node.js
- Set environment variables in settings
- Ensure PORT variable is not hardcoded

**Vercel:**
- Add `vercel.json` configuration
- Use serverless functions for API

**Netlify:**
- Build React app separately
- Use Netlify Functions for backend

### Testing Your Deployed App:

1. **Check API Endpoint:**
   ```
   GET https://your-app.com/api
   Should return: {"message": "Welcome to Marcel's Portfolio API", ...}
   ```

2. **Test Auth Endpoint:**
   ```
   POST https://your-app.com/auth/signin
   Body: {"email": "test@example.com", "password": "password"}
   ```

3. **Check Debug Route:**
   ```
   GET https://your-app.com/debug
   Should return debug information
   ```

### Common Error Messages and Solutions:

#### "Network Error" or "Failed to Fetch"
- **Cause:** API endpoint not reachable
- **Solution:** Check if server is running, verify URL paths

#### "404 Not Found" for API calls
- **Cause:** Route not properly configured
- **Solution:** Verify server.js route configuration

#### "CORS Error"
- **Cause:** Cross-origin request blocked
- **Solution:** Ensure CORS is configured properly in server.js

#### "500 Internal Server Error"
- **Cause:** Server-side error
- **Solution:** Check server logs, verify environment variables

### Debugging in Production:

1. **Check Browser Network Tab:**
   - See exact request URL
   - Check response status
   - Verify request headers

2. **Check Server Logs:**
   - Look for console.log outputs
   - Check for error messages
   - Verify database connections

3. **Test API Directly:**
   - Use Postman or curl
   - Test each endpoint individually

### Environment-Specific Configurations:

**Development:**
```javascript
// vite.config.js proxy handles routing
proxy: {
  '/api': 'http://localhost:3000',
  '/auth': 'http://localhost:3000'
}
```

**Production:**
```javascript
// server.js serves both frontend and API
app.use(express.static(path.join(__dirname, 'client/dist')));
```

### Final Verification:

After deployment, test these scenarios:
- [ ] Home page loads correctly
- [ ] Can navigate between pages
- [ ] Contact form submits successfully
- [ ] SignIn works with valid credentials
- [ ] SignIn shows error with invalid credentials
- [ ] Admin dashboard accessible (if admin)
- [ ] All API endpoints respond correctly

If you still encounter issues after these fixes, the problem might be:
1. Database connection issues
2. Environment variables not set correctly
3. Build process not including all files
4. Platform-specific configuration needed

Let me know the specific error message you're seeing and I can provide more targeted help!
