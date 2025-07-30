import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./server/config/database.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Import routes
import contactRoutes from './server/routes/contactRoutes.js';
import projectRoutes from './server/routes/projectRoutes.js';
import qualificationRoutes from './server/routes/qualificationRoutes.js';
import userRoutes from './server/routes/userRoutes.js';

// API Routes (these take priority)
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/users', userRoutes);

// Welcome route for root API
app.get("/api", function (req, res) {
  res.json({ 
    message: "Welcome to Marcel's Portfolio API",
    status: "Server running successfully",
    timestamp: new Date().toISOString(),
    endpoints: {
      contacts: "/api/contacts",
      projects: "/api/projects", 
      qualifications: "/api/qualifications",
      users: "/api/users"
    }
  });
});

// Root route - displays welcome message for API access
app.get('/', (req, res) => {
  res.json({
    "message": "Welcome to My Portfolio application.",
    "note": "Frontend is running on http://localhost:5174",
    "api": "http://localhost:3000/api"
  });
});

// Serve static files from React build (for production)
app.use(express.static(path.join(__dirname, 'client/dist')));

// Serve React app for all non-API routes (for production)
app.get('*', (req, res) => {
  if (!req.url.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
  console.log(`📱 Frontend: http://localhost:5173/`);
  console.log(`🔗 API: http://localhost:${PORT}/api`);
});

export default app;
