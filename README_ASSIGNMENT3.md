# Marcel Borkowski COMP229 Lab Assignments - Assignment 3

## Assignment 3: Full-Stack Integration and Authentication

This project implements Assignment 3 requirements for COMP229, featuring a complete full-stack portfolio application with authentication, user roles, CRUD operations, and comprehensive frontend-backend integration.

## 🎯 Assignment 3 Requirements Implemented

### ✅ Authentication System
- **Sign-in and Sign-out Routes**: Complete JWT-based authentication
- **User Registration**: New user signup with email validation
- **Protected Routes**: Route-based access control
- **Role-based Access**: Admin vs regular user permissions

### ✅ React Forms with State Management
- **Authentication Forms**: Sign-in and sign-up with validation
- **Contact Form**: Public contact form with backend integration
- **Admin CRUD Forms**: Project and contact management forms
- **Form Validation**: Client-side and server-side validation

### ✅ Frontend-Backend Integration
- **API Integration**: Complete REST API consumption
- **State Management**: React Context for authentication
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: User-friendly loading indicators

### ✅ CRUD Operations
- **Contacts**: Create (public form), Read, Delete (admin)
- **Projects**: Create, Read, Update, Delete (admin)
- **Users**: Create (registration), Read (profile)
- **Full CRUD UI**: Admin dashboard with management interfaces

### ✅ User Roles and Permissions
- **Admin Users**: Full CRUD access to all resources
- **Regular Users**: View access to public content
- **Role-based UI**: Different interfaces based on user role
- **Protected Actions**: Authentication required for sensitive operations

## 🏗️ Project Structure

```
Marcel Borkowski COMP229 Lab Assignments/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation with auth states
│   │   │   ├── ProtectedRoute.jsx  # Route protection component
│   │   │   └── Logo.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx     # Authentication state management
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Public home page
│   │   │   ├── About.jsx           # About page
│   │   │   ├── Projects.jsx        # Public projects view
│   │   │   ├── Services.jsx        # Services page
│   │   │   ├── Contact.jsx         # Public contact form
│   │   │   ├── SignIn.jsx          # User authentication
│   │   │   ├── SignUp.jsx          # User registration
│   │   │   ├── Dashboard.jsx       # Role-based dashboard
│   │   │   └── admin/
│   │   │       ├── AdminContacts.jsx    # Contact management
│   │   │       └── AdminProjects.jsx    # Project management
│   │   ├── App.jsx                 # Main app with routing
│   │   └── main.jsx
│   └── package.json
├── server/                         # Express Backend
│   ├── controllers/
│   │   ├── authController.js       # Authentication logic
│   │   ├── userController.js       # User management
│   │   ├── contactController.js    # Contact operations
│   │   └── projectController.js    # Project operations
│   ├── routes/
│   │   ├── authRoutes.js          # Auth endpoints
│   │   ├── userRoutes.js          # User endpoints
│   │   ├── contactRoutes.js       # Contact endpoints
│   │   └── projectRoutes.js       # Project endpoints
│   ├── models/
│   │   ├── User.js                # User model with roles
│   │   ├── Contact.js             # Contact model
│   │   └── Project.js             # Project model
│   ├── middleware/
│   │   ├── auth.js                # JWT authentication
│   │   └── validation.js          # Input validation
│   └── config/
│       └── database.js            # MongoDB connection
├── server.js                      # Main server file
└── package.json                   # Root package.json
```

## 🔐 Authentication Features

### JWT-Based Authentication
- Secure token-based authentication
- Automatic token refresh handling
- Persistent login state with localStorage
- Secure password hashing with bcrypt

### User Registration & Login
- Email validation and uniqueness checking
- Password strength requirements
- Error handling and user feedback
- Automatic login after registration

### Role-Based Access Control
- Admin vs Regular user roles
- Protected routes based on authentication
- Admin-only resources and operations
- Dynamic UI based on user permissions

## 📝 CRUD Operations Implementation

### Contacts Management (Admin)
- **Create**: Public contact form submission
- **Read**: Admin dashboard with all contact messages
- **Delete**: Admin can remove contact messages
- **UI Features**: Modal views, delete confirmations, message details

### Projects Management (Admin)
- **Create**: Add new portfolio projects
- **Read**: View all projects in admin dashboard
- **Update**: Edit existing project details
- **Delete**: Remove projects with confirmation
- **Features**: Technology tags, URLs, descriptions

### Users Management
- **Create**: User registration system
- **Read**: User profile access
- **Authentication**: Login/logout functionality
- **Role Assignment**: Admin flag in user model

## 🎨 Frontend Features

### React Components
- **Functional Components**: Modern React with hooks
- **State Management**: useState, useEffect, useContext
- **Form Handling**: Controlled components with validation
- **Error Boundaries**: Comprehensive error handling

### UI/UX Features
- **Responsive Design**: Mobile-friendly layouts
- **Loading States**: Visual feedback during operations
- **Error Messages**: User-friendly error handling
- **Success Feedback**: Confirmation messages
- **Modal Dialogs**: For detailed views and confirmations

### Routing & Navigation
- **React Router**: Client-side routing
- **Protected Routes**: Authentication-based access
- **Dynamic Navigation**: Different menus for auth states
- **Role-based UI**: Admin vs user interfaces

## 🔧 Backend Features

### Express.js Server
- **RESTful API**: Standard HTTP methods and status codes
- **Middleware**: Authentication, validation, CORS
- **Error Handling**: Comprehensive error responses
- **Input Validation**: Server-side validation with express-validator

### Database Integration
- **MongoDB Atlas**: Cloud database
- **Mongoose ODM**: Schema definition and validation
- **Data Models**: User, Contact, Project schemas
- **Relationships**: User references in data models

### API Endpoints

#### Authentication
- `POST /auth/signin` - User login
- `GET /auth/signout` - User logout

#### Users
- `POST /api/users/register` - User registration
- `GET /api/users/profile` - Get user profile (protected)

#### Contacts
- `POST /api/contacts` - Create contact message
- `GET /api/contacts` - Get all contacts (admin only)
- `DELETE /api/contacts/:id` - Delete contact (admin only)

#### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Marcel Borkowski COMP229 Lab Assignments"
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

   This starts both the Express server (port 3000) and React development server (port 5173).

### Default Admin User
To test admin features, you'll need to create a user and manually set `isAdmin: true` in the database, or use the user registration and modify the user document in MongoDB Atlas.

## 🧪 Testing Assignment 3 Features

### Authentication Testing
1. **Registration**: Visit `/signup` to create a new account
2. **Login**: Use `/signin` with your credentials
3. **Protected Routes**: Try accessing `/dashboard` without login
4. **Role-based Access**: Test admin routes with non-admin user

### CRUD Operations Testing
1. **Contacts**: Submit contact form, view in admin dashboard
2. **Projects**: Create, edit, delete projects as admin
3. **User Management**: Register users, view profiles
4. **Form Validation**: Test with invalid inputs

### Frontend-Backend Integration
1. **API Calls**: Monitor network tab for API requests
2. **Error Handling**: Test with network disconnected
3. **State Management**: Check authentication persistence on refresh
4. **Loading States**: Observe loading indicators during operations

## 📚 Course Learning Outcomes Demonstrated

### Week 8: CRUD Operations with Mongoose
- ✅ User model with authentication fields
- ✅ Contact and Project models with full CRUD
- ✅ Mongoose schema validation and middleware
- ✅ Database relationships and references

### Week 9: User Authentication and Authorization
- ✅ JWT token-based authentication
- ✅ Password hashing and security
- ✅ Protected routes and middleware
- ✅ Role-based access control

### Week 10: Full-Stack Integration
- ✅ React frontend with Express backend
- ✅ API integration and state management
- ✅ Error handling and user experience
- ✅ Deployment-ready application structure

## 🛠️ Technologies Used

### Frontend
- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Context API**: State management
- **Vite**: Fast development build tool
- **CSS3**: Custom styling with gradients and animations

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication tokens
- **bcrypt**: Password hashing
- **express-validator**: Input validation

### Development Tools
- **Concurrently**: Run multiple npm scripts
- **Nodemon**: Auto-restart server on changes
- **ESLint**: Code linting
- **dotenv**: Environment variable management

## 📈 Future Enhancements

- Email verification for user registration
- Password reset functionality
- File upload for project images
- Advanced search and filtering
- Real-time notifications
- API rate limiting and security enhancements

## 👨‍💻 Author

**Marcel Borkowski**  
Student ID: [301488651]  
Course: COMP229 - Web Application Development  
Semester: 3  
Assignment: 3 - Full-Stack Integration

---

This project demonstrates comprehensive full-stack development skills including React frontend development, Express.js backend development, MongoDB database integration, user authentication, role-based access control, and complete CRUD operations as required for Assignment 3.
