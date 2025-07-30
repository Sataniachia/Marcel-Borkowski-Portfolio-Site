import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * Dashboard page component
 * Shows different content based on user role (admin vs regular user)
 */
export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    contacts: 0,
    projects: 0,
    qualifications: 0
  });

  useEffect(() => {
    if (isAdmin()) {
      // Fetch stats for admin dashboard
      fetchStats();
    }
  }, []);

  const fetchStats = async () => {
    try {
      // These endpoints will be created later
      const contactsRes = await fetch('/api/contacts');
      const projectsRes = await fetch('/api/projects');
      const qualificationsRes = await fetch('/api/qualifications');
      
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setStats(prev => ({ ...prev, contacts: contactsData.data?.length || 0 }));
      }
      
      if (projectsRes.ok) {
        const projectsData = await projectsRes.json();
        setStats(prev => ({ ...prev, projects: projectsData.data?.length || 0 }));
      }
      
      if (qualificationsRes.ok) {
        const qualificationsData = await qualificationsRes.json();
        setStats(prev => ({ ...prev, qualifications: qualificationsData.data?.length || 0 }));
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (isAdmin()) {
    return <AdminDashboard stats={stats} user={user} navigate={navigate} />;
  }

  return <UserDashboard user={user} navigate={navigate} />;
}

// Admin Dashboard Component
function AdminDashboard({ stats, user, navigate }) {
  return (
    <div className="page">
      <div className="page-content">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
              Admin Dashboard
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
              Welcome back, {user?.name}! Manage your portfolio content.
            </p>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <StatsCard
              title="Contact Messages"
              count={stats.contacts}
              icon="📬"
              color="#667eea"
              onClick={() => navigate('/admin/contacts')}
            />
            <StatsCard
              title="Projects"
              count={stats.projects}
              icon="🚀"
              color="#764ba2"
              onClick={() => navigate('/admin/projects')}
            />
            <StatsCard
              title="Qualifications"
              count={stats.qualifications}
              icon="🎓"
              color="#f093fb"
              onClick={() => navigate('/admin/qualifications')}
            />
          </div>

          {/* Quick Actions */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ color: '#374151', marginBottom: '1.5rem' }}>
              Quick Actions
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <ActionButton
                title="Manage Contacts"
                description="View and respond to contact messages"
                onClick={() => navigate('/admin/contacts')}
                color="#667eea"
              />
              <ActionButton
                title="Add Project"
                description="Create a new portfolio project"
                onClick={() => navigate('/admin/projects/new')}
                color="#764ba2"
              />
              <ActionButton
                title="Update Qualifications"
                description="Manage education and experience"
                onClick={() => navigate('/admin/qualifications')}
                color="#f093fb"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// User Dashboard Component
function UserDashboard({ user, navigate }) {
  return (
    <div className="page">
      <div className="page-content">
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ color: '#667eea', marginBottom: '1rem' }}>
              Welcome, {user?.name}!
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Thank you for visiting my portfolio. You can explore my projects, learn about my background, 
              and get in touch if you'd like to collaborate.
            </p>
          </div>

          {/* User Actions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <ActionButton
              title="View Projects"
              description="Explore my latest work and case studies"
              onClick={() => navigate('/projects')}
              color="#667eea"
            />
            <ActionButton
              title="About Me"
              description="Learn about my background and experience"
              onClick={() => navigate('/about')}
              color="#764ba2"
            />
            <ActionButton
              title="Get in Touch"
              description="Send me a message or view contact info"
              onClick={() => navigate('/contact')}
              color="#f093fb"
            />
          </div>

          {/* Profile Section */}
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ color: '#374151', marginBottom: '1rem' }}>
              Your Profile
            </h2>
            <div style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Member since:</strong> {new Date(user?.created).toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => navigate('/profile')}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ title, count, icon, color, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-4px)';
        e.target.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ color, fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        {count}
      </h3>
      <p style={{ color: '#64748b', fontSize: '1rem' }}>{title}</p>
    </div>
  );
}

// Action Button Component
function ActionButton({ title, description, onClick, color }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textAlign: 'left'
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      <h4 style={{ color, marginBottom: '0.5rem', fontSize: '1.1rem', fontWeight: '600' }}>
        {title}
      </h4>
      <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
        {description}
      </p>
    </div>
  );
}
