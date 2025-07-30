import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AdminContacts from './pages/admin/AdminContacts';
import AdminProjects from './pages/admin/AdminProjects';
import AdminQualifications from './pages/admin/AdminQualifications';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/contacts" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminContacts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/projects" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminProjects />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/qualifications" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminQualifications />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;