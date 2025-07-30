import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Navigation component for the portfolio website
 * Includes custom logo and navigation links to all pages
 * Updated for Assignment 3 with authentication features
 */
export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <div className="nav-container">
        {/* Custom Logo - Simple geometric design with initials */}
        <Link to="/" className="logo">
          MB
        </Link>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
          
          {/* Authentication Links */}
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              {isAdmin() && (
                <Link to="/admin/contacts" style={{ color: '#f093fb' }}>
                  Admin
                </Link>
              )}
              <div className="user-menu">
                <span style={{ 
                  color: '#667eea', 
                  marginRight: '1rem',
                  fontSize: '0.9rem'
                }}>
                  Hi, {user.name}
                </span>
                <button 
                  onClick={handleLogout}
                  style={{
                    background: 'transparent',
                    border: '1px solid #667eea',
                    color: '#667eea',
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#667eea';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#667eea';
                  }}
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/signin">Sign In</Link>
              <Link 
                to="/signup"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}