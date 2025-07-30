# Marcel Borkowski Portfolio - Complete Technical Documentation

## Table of Contents
1. [Overview - What is a MERN Stack?](#overview)
2. [Project Structure - How Files are Organized](#project-structure)
3. [Frontend (React) - What Users See](#frontend)
4. [Backend (Express.js) - The Server Logic](#backend)
5. [Database (MongoDB) - Where Data Lives](#database)
6. [How Everything Communicates](#communication)
7. [Authentication System - Security](#authentication)
8. [Development Tools - Making Life Easier](#development-tools)
9. [Deployment - Making it Live](#deployment)

---

## Overview - What is a MERN Stack?

### The Big Picture
Your portfolio website is built using the **MERN Stack**, which is like a team of 4 technologies working together:

1. **M**ongoDB - The database (like a filing cabinet for your data)
2. **E**xpress.js - The backend server (like a waiter taking orders)
3. **R**eact - The frontend (what users see and interact with)
4. **N**ode.js - The runtime (the kitchen where JavaScript runs on the server)

### Think of it Like a Restaurant:
- **React (Frontend)** = The dining room where customers sit and order
- **Express.js (Backend)** = The waiter who takes orders and brings food
- **MongoDB (Database)** = The kitchen storage where ingredients are kept
- **Node.js** = The kitchen equipment that makes everything run

---

## Project Structure - How Files are Organized

```
Marcel Borkowski COMP229 Lab Assignments/
├── package.json                 # Main project configuration
├── server.js                   # Main server file (the "brain")
├── .env                        # Secret configuration (passwords, etc.)
│
├── client/                     # Frontend (React app)
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Build tool configuration
│   ├── index.html             # Main HTML file
│   └── src/
│       ├── main.jsx           # App entry point
│       ├── App.jsx            # Main app component
│       ├── components/        # Reusable UI pieces
│       └── pages/             # Different website pages
│
└── server/                    # Backend (Express.js app)
    ├── models/               # Database schemas (data structure)
    ├── controllers/          # Business logic (what happens when)
    ├── routes/              # URL endpoints (where to go)
    ├── middleware/          # Helper functions (security, validation)
    └── config/             # Configuration files
```

### What Each Folder Does:
- **client/** = Everything users see (your website's "face")
- **server/** = Behind-the-scenes logic (your website's "brain")
- **models/** = Data structure definitions (like forms to fill out)
- **controllers/** = Action handlers (what happens when someone clicks)
- **routes/** = URL mapping (which page goes where)

---

## Frontend (React) - What Users See

### What is React?
React is like building with LEGO blocks. Each piece (component) can be reused and combined to make bigger structures.

### Your Website Pages:
1. **Home.jsx** - Welcome page with mission statement
2. **About.jsx** - Your personal information and resume
3. **Projects.jsx** - Showcase of your work
4. **Services.jsx** - What you offer to clients
5. **Contact.jsx** - Contact form and information

### How React Components Work:

```jsx
// This is like a template for a button
function MyButton({ text, onClick }) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

// This uses the button template
function MyPage() {
  return (
    <div>
      <MyButton text="Click Me!" onClick={() => alert("Hello!")} />
    </div>
  );
}
```

### Navigation System:
Your website uses **React Router** which is like a GPS system:
- When someone types `/about`, it shows the About page
- When someone clicks "Projects", it navigates to `/projects`
- The URL changes but the page doesn't fully reload (faster!)

### State Management:
React uses "state" to remember things temporarily:
```jsx
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: ''
});
```
This is like having a notepad that remembers what the user typed in the form.

---

## Backend (Express.js) - The Server Logic

### What is Express.js?
Express.js is like a receptionist at a hotel - it listens for requests and decides what to do with them.

### Your Server Structure:

#### 1. **server.js** - The Main Controller
```javascript
// This is like the main switchboard
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/users', userRoutes);
```

When someone visits `/api/contacts`, the server says "Send this to the contact handler!"

#### 2. **Models** - Data Blueprints
Models define what your data looks like:

```javascript
// Contact.js - This is like a form template
const contactSchema = {
  firstname: String,    // Must be text
  lastname: String,     // Must be text  
  email: String        // Must be email format
}
```

Think of it like designing a business card template - you decide what information goes where.

#### 3. **Controllers** - The Action Handlers
Controllers contain the actual logic:

```javascript
// contactController.js
export const createContact = async (req, res) => {
  // 1. Get the data from the request
  // 2. Validate it's correct
  // 3. Save to database
  // 4. Send response back
};
```

It's like having different specialists:
- Contact Controller = Handles all contact-related tasks
- Project Controller = Handles all project-related tasks
- User Controller = Handles user accounts and login

#### 4. **Routes** - The URL Map
Routes decide which controller handles what:

```javascript
// contactRoutes.js
router.get('/', getAllContacts);        // GET /api/contacts
router.post('/', createContact);        // POST /api/contacts
router.put('/:id', updateContact);      // PUT /api/contacts/123
router.delete('/:id', deleteContact);   // DELETE /api/contacts/123
```

It's like a directory in a building - telling you which floor to go to for different services.

### CRUD Operations Explained:
- **C**reate = Add new data (like adding a new contact)
- **R**ead = Get existing data (like viewing all contacts)
- **U**pdate = Modify existing data (like editing a contact)
- **D**elete = Remove data (like deleting a contact)

---

## Database (MongoDB) - Where Data Lives

### What is MongoDB?
MongoDB is like a digital filing cabinet that stores your data in "collections" (folders) and "documents" (files).

### Your Database Structure:
```
Portfolio Database
├── contacts collection      # Contact form submissions
├── projects collection      # Your project information
├── qualifications collection # Your education/certifications
└── users collection         # User accounts for login
```

### How Data is Stored:
Unlike traditional databases that use tables, MongoDB stores data like JSON objects:

```javascript
// A contact document
{
  "_id": "507f1f77bcf86cd799439011",
  "firstname": "John",
  "lastname": "Doe", 
  "email": "john@example.com",
  "createdAt": "2025-01-30T10:30:00Z"
}
```

### MongoDB Atlas (Cloud Database):
Instead of running MongoDB on your computer, you use **MongoDB Atlas** - think of it like using Google Drive instead of storing files on your hard drive:
- Always accessible from anywhere
- Automatically backed up
- Professionally maintained
- Scales as you grow

---

## How Everything Communicates

### The Complete Flow:

#### 1. **User Fills Out Contact Form**
```
User types: "John Doe, john@email.com"
↓
React stores this in component state
```

#### 2. **Form Submission**
```
User clicks "Submit"
↓
React sends HTTP POST request to /api/contacts
↓
Request includes: {"firstname": "John", "lastname": "Doe", "email": "john@email.com"}
```

#### 3. **Server Receives Request**
```
Express.js server receives POST /api/contacts
↓
Routes file directs to contactController.createContact()
↓
Validation middleware checks if data is valid
```

#### 4. **Database Interaction**
```
Controller creates new Contact document
↓
Mongoose saves to MongoDB Atlas
↓
Database confirms save was successful
```

#### 5. **Response Back to User**
```
Database success → Controller success
↓
Controller sends JSON response: {"success": true, "message": "Contact saved"}
↓
React receives response
↓
User sees "Thank you! Message received."
```

### API Communication:
Your frontend and backend talk using **HTTP requests**:

```javascript
// Frontend (React) making a request
const response = await fetch('/api/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstname: 'John',
    lastname: 'Doe',
    email: 'john@email.com'
  })
});

// Backend (Express) handling the request
app.post('/api/contacts', (req, res) => {
  const { firstname, lastname, email } = req.body;
  // Process the data...
  res.json({ success: true, message: 'Contact saved!' });
});
```

---

## Authentication System - Security

### What is JWT (JSON Web Tokens)?
JWT is like a special ID card that proves you're logged in:

1. **User logs in** with email/password
2. **Server verifies** credentials against database
3. **Server creates JWT token** (like issuing an ID card)
4. **User keeps token** and sends it with future requests
5. **Server validates token** before allowing access

### Password Security:
Your passwords are protected using **bcrypt**:
```javascript
// When user registers:
const plainPassword = "mypassword123";
const hashedPassword = await bcrypt.hash(plainPassword, 12);
// Stores: "$2b$12$xyz...abc" (encrypted, unreadable)

// When user logs in:
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
// Returns: true if passwords match
```

Think of it like a safe - even if someone steals your password file, they can't read the actual passwords.

### Protected Routes:
Some parts of your site require login:
```javascript
// Middleware that checks if user is logged in
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Please log in' });
  }
  // Verify token and continue...
};

// Using the middleware
app.get('/api/admin/contacts', requireAuth, getAllContacts);
```

---

## Development Tools - Making Life Easier

### 1. **Vite** - Frontend Build Tool
Vite is like a smart assistant for React development:
- **Hot Reload**: Changes show instantly (no manual refresh)
- **Fast Builds**: Compiles code quickly
- **Dev Server**: Runs your frontend on http://localhost:5174

### 2. **Nodemon** - Backend Auto-Restart
Nodemon watches your backend files and restarts the server when you make changes:
```
[nodemon] starting `node server.js`
[nodemon] watching path(s): *.*
[nodemon] restarting due to changes...
```

### 3. **Concurrently** - Run Multiple Commands
Lets you run both frontend and backend at the same time:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run client\" \"npm run server\""
  }
}
```

### 4. **Environment Variables (.env)**
Keeps secrets safe:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Portfolio
JWT_SECRET=your-super-secret-key
PORT=3000
```

These are like hiding your diary key - the application knows where to find it, but it's not visible in your code.

### 5. **Express Validator** - Input Validation
Checks if user input is valid before saving:
```javascript
body('email')
  .isEmail()
  .withMessage('Please provide a valid email')
  .normalizeEmail()
```

It's like having a bouncer at a club - checking IDs before letting people in.

---

## Complete API Reference

### Your REST API Endpoints:

#### **Contacts** (`/api/contacts`)
```
GET    /api/contacts      → Get all contacts
GET    /api/contacts/:id  → Get specific contact
POST   /api/contacts      → Create new contact
PUT    /api/contacts/:id  → Update contact
DELETE /api/contacts/:id  → Delete contact
DELETE /api/contacts      → Delete all contacts
```

#### **Projects** (`/api/projects`)
```
GET    /api/projects      → Get all projects
GET    /api/projects/:id  → Get specific project
POST   /api/projects      → Create new project
PUT    /api/projects/:id  → Update project
DELETE /api/projects/:id  → Delete project
DELETE /api/projects      → Delete all projects
```

#### **Qualifications** (`/api/qualifications`)
```
GET    /api/qualifications      → Get all qualifications
GET    /api/qualifications/:id  → Get specific qualification
POST   /api/qualifications      → Create new qualification
PUT    /api/qualifications/:id  → Update qualification
DELETE /api/qualifications/:id  → Delete qualification
DELETE /api/qualifications      → Delete all qualifications
```

#### **Users** (`/api/users`)
```
GET    /api/users      → Get all users
GET    /api/users/:id  → Get specific user
POST   /api/users      → Create new user
PUT    /api/users/:id  → Update user
DELETE /api/users/:id  → Delete user
DELETE /api/users      → Delete all users
```

### Example API Usage:

#### Creating a New Contact:
```bash
POST /api/contacts
Content-Type: application/json

{
  "firstname": "Jane",
  "lastname": "Smith",
  "email": "jane@example.com"
}

Response:
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstname": "Jane",
    "lastname": "Smith",
    "email": "jane@example.com",
    "createdAt": "2025-01-30T10:30:00Z"
  }
}
```

---

## Error Handling & Validation

### Input Validation:
Every piece of data is checked before saving:

```javascript
// Contact validation rules
validateContact = [
  body('firstname')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
];
```

### Error Response Format:
```javascript
// Validation error
{
  "success": false,
  "message": "Validation errors",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}

// Server error
{
  "success": false,
  "message": "Server Error: Unable to save contact",
  "error": "Database connection failed"
}
```

---

## Development Workflow

### How to Start Development:
1. **Open Terminal** in project root
2. **Run**: `npm run dev`
3. **This starts**:
   - Frontend server on http://localhost:5174
   - Backend server on http://localhost:3000
   - MongoDB Atlas connection

### Development Process:
1. **Make changes** to React components or backend code
2. **Save files** - changes appear automatically
3. **Test** in browser
4. **Check console** for any errors
5. **Commit changes** to Git when working

### File Watching:
- **Vite** watches frontend files → auto-reloads browser
- **Nodemon** watches backend files → auto-restarts server
- **Hot Module Replacement** → changes without full page reload

---

## Testing Your APIs

### Using Postman:
Postman is like a tool for testing your backend without needing a frontend:

1. **Set Method**: GET, POST, PUT, DELETE
2. **Set URL**: http://localhost:3000/api/contacts
3. **Set Headers**: Content-Type: application/json
4. **Set Body** (for POST/PUT):
   ```json
   {
     "firstname": "Test",
     "lastname": "User",
     "email": "test@example.com"
   }
   ```
5. **Send Request** and see response

### Test Examples:

#### Test 1: Get All Contacts
```
GET http://localhost:3000/api/contacts

Expected Response:
{
  "success": true,
  "count": 0,
  "data": []
}
```

#### Test 2: Create Contact
```
POST http://localhost:3000/api/contacts
Body: {
  "firstname": "John",
  "lastname": "Doe", 
  "email": "john@test.com"
}

Expected Response:
{
  "success": true,
  "message": "Contact created successfully",
  "data": { ... contact object ... }
}
```

---

## Deployment - Making it Live

### What Happens During Deployment:

1. **Build Process**: 
   - Vite compiles React code into optimized HTML/CSS/JS
   - Creates production-ready files in `dist/` folder

2. **Server Setup**:
   - Express.js serves both API and static files
   - Routes API calls to `/api/*`
   - Serves React app for all other routes

3. **Database Connection**:
   - Uses MongoDB Atlas (cloud database)
   - Connection string from environment variables

### Deployment Platforms:
- **Render** - Easy Node.js hosting
- **Railway** - Simple deployment with git integration
- **Vercel** - Great for React apps
- **Netlify** - Static site hosting with serverless functions

---

## Common Issues & Solutions

### Frontend Issues:
1. **"Module not found"** → Check file paths and imports
2. **"Blank page"** → Check browser console for JavaScript errors
3. **"Network Error"** → Backend might not be running

### Backend Issues:
1. **"Cannot connect to MongoDB"** → Check connection string in .env
2. **"Port already in use"** → Kill existing processes or change port
3. **"Validation error"** → Check request body format matches model

### Database Issues:
1. **"Authentication failed"** → Check MongoDB Atlas credentials
2. **"Collection not found"** → Check database name and collection names
3. **"Timeout"** → Check internet connection and Atlas IP whitelist

---

## Security Best Practices

### What Your App Does Right:

1. **Password Hashing**: Uses bcrypt (unbreakable encryption)
2. **JWT Tokens**: Secure session management
3. **Input Validation**: Prevents malicious data
4. **Environment Variables**: Keeps secrets safe
5. **CORS**: Controls which websites can access your API
6. **Mongoose**: Prevents database injection attacks

### Production Security:
- Never commit `.env` files to Git
- Use HTTPS in production
- Set strong JWT secrets
- Validate all user input
- Limit request rates to prevent spam

---

## Learning Path & Next Steps

### Understanding Levels:

#### Beginner Level ✅ (You're Here)
- Understand what each technology does
- Know how to start the development servers
- Can make simple changes to existing code

#### Intermediate Level (Next Goals)
- Create new API endpoints
- Add new React components
- Understand database relationships
- Handle complex validation

#### Advanced Level (Future Goals)
- Performance optimization
- Advanced security features
- Microservices architecture
- DevOps and CI/CD

### Key Concepts to Master:
1. **HTTP Methods** (GET, POST, PUT, DELETE)
2. **JSON** data format
3. **Async/Await** for handling promises
4. **React Hooks** (useState, useEffect)
5. **Middleware** concept in Express
6. **Schema design** in MongoDB

---

## Summary

Your portfolio website is a full-stack web application that demonstrates modern web development practices:

### **Frontend (React)**: 
- 5 responsive pages showcasing your portfolio
- Interactive contact form
- Modern navigation and UI components

### **Backend (Express.js)**:
- RESTful API with full CRUD operations
- Secure authentication system
- Input validation and error handling

### **Database (MongoDB)**:
- Cloud-hosted on MongoDB Atlas
- 4 collections for different data types
- Automatic timestamps and indexing

### **Integration**:
- Seamless communication between frontend and backend
- Real-time development with hot reloading
- Production-ready deployment setup

This architecture gives you a solid foundation for building any web application and demonstrates industry-standard practices that employers look for.

---

## Quick Reference Commands

```bash
# Start development
npm run dev

# Install new package
npm install package-name

# Backend only
node server.js

# Frontend only
cd client && npm run dev

# View logs
# Check terminal output for errors

# Database
# Access MongoDB Atlas dashboard online

# Testing
# Use Postman for API testing
```

Remember: Every professional web developer started exactly where you are now. The key is understanding how these pieces work together, which you now do! 🚀
