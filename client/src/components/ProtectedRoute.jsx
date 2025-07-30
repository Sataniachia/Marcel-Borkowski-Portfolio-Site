import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '1.2rem'
      }}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  if (adminOnly && !isAdmin()) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        color: '#d73502'
      }}>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <p>Admin privileges required.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
