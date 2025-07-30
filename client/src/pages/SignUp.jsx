import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * SignUp page component
 * Handles user registration
 */
export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Auto-login after successful registration
        login(result.data, result.token);
        navigate('/dashboard');
      } else {
        if (result.errors) {
          // Handle validation errors from server
          const serverErrors = {};
          result.errors.forEach(error => {
            if (error.path) {
              serverErrors[error.path] = error.msg;
            }
          });
          setErrors(serverErrors);
        } else {
          setErrors({ submit: result.message || 'Registration failed' });
        }
      }
    } catch (error) {
      console.error('Error registering:', error);
      setErrors({ submit: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="page-content">
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
          <h1 style={{ textAlign: 'center', color: '#667eea', marginBottom: '2rem' }}>
            Create Account
          </h1>
          
          {errors.submit && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              {errors.submit}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.name ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = errors.name ? '#ef4444' : '#667eea'}
                onBlur={(e) => e.target.style.borderColor = errors.name ? '#ef4444' : '#e2e8f0'}
              />
              {errors.name && (
                <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.email ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = errors.email ? '#ef4444' : '#667eea'}
                onBlur={(e) => e.target.style.borderColor = errors.email ? '#ef4444' : '#e2e8f0'}
              />
              {errors.email && (
                <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.password ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = errors.password ? '#ef4444' : '#667eea'}
                onBlur={(e) => e.target.style.borderColor = errors.password ? '#ef4444' : '#e2e8f0'}
              />
              {errors.password && (
                <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                  {errors.password}
                </span>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `2px solid ${errors.confirmPassword ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : '#667eea'}
                onBlur={(e) => e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : '#e2e8f0'}
              />
              {errors.confirmPassword && (
                <span style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'white',
                background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '8px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                marginBottom: '1rem'
              }}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: '#64748b' }}>
              Already have an account?{' '}
              <Link 
                to="/signin" 
                style={{ 
                  color: '#667eea', 
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
