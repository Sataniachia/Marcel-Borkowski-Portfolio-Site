import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Admin Qualifications/Education Management Page
 * CRUD operations for qualifications - Assignment 3
 */
export default function AdminQualifications() {
  const { user } = useAuth();
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingQualification, setEditingQualification] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [qualificationToDelete, setQualificationToDelete] = useState(null);

  // Fetch qualifications on component mount
  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/qualifications');
      const result = await response.json();
      
      if (result.success) {
        setQualifications(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch qualifications');
      }
    } catch (error) {
      console.error('Error fetching qualifications:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQualification = async (qualificationId) => {
    try {
      const response = await fetch(`/api/qualifications/${qualificationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        setQualifications(qualifications.filter(qual => qual._id !== qualificationId));
        setShowDeleteModal(false);
        setQualificationToDelete(null);
      } else {
        setError(result.message || 'Failed to delete qualification');
      }
    } catch (error) {
      console.error('Error deleting qualification:', error);
      setError('Network error. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="page-content">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h2>Loading qualifications...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-content">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <h1 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                Education & Qualifications
              </h1>
              <p style={{ color: '#64748b', margin: 0 }}>
                Manage your educational background and certifications
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              + Add Qualification
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              {error}
            </div>
          )}

          {/* Qualifications Grid */}
          {qualifications.length === 0 ? (
            <div style={{
              background: 'white',
              padding: '3rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#64748b', marginBottom: '1rem' }}>
                No qualifications yet
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
                Add your educational background and certifications.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Add First Qualification
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {qualifications.map((qualification) => (
                <QualificationCard
                  key={qualification._id}
                  qualification={qualification}
                  onEdit={() => setEditingQualification(qualification)}
                  onDelete={() => {
                    setQualificationToDelete(qualification);
                    setShowDeleteModal(true);
                  }}
                />
              ))}
            </div>
          )}

          {/* Create/Edit Qualification Modal */}
          {(showCreateModal || editingQualification) && (
            <QualificationModal
              qualification={editingQualification}
              onClose={() => {
                setShowCreateModal(false);
                setEditingQualification(null);
              }}
              onSave={(qualificationData) => {
                if (editingQualification) {
                  // Update existing qualification
                  setQualifications(qualifications.map(q => 
                    q._id === editingQualification._id ? { ...q, ...qualificationData } : q
                  ));
                } else {
                  // Add new qualification
                  setQualifications([qualificationData, ...qualifications]);
                }
                setShowCreateModal(false);
                setEditingQualification(null);
              }}
            />
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && qualificationToDelete && (
            <DeleteConfirmationModal
              qualification={qualificationToDelete}
              onConfirm={() => handleDeleteQualification(qualificationToDelete._id)}
              onCancel={() => {
                setShowDeleteModal(false);
                setQualificationToDelete(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Qualification Card Component
function QualificationCard({ qualification, onEdit, onDelete }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      {/* Qualification Header */}
      <div style={{
        height: '120px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2.5rem'
      }}>
        🎓
      </div>

      {/* Qualification Content */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ 
          margin: '0 0 0.5rem 0', 
          color: '#374151',
          fontSize: '1.2rem'
        }}>
          {qualification.title || qualification.degree}
        </h3>
        
        <p style={{ 
          margin: '0 0 0.5rem 0', 
          color: '#667eea',
          fontSize: '1rem',
          fontWeight: '600'
        }}>
          {qualification.institution || qualification.school}
        </p>

        <p style={{ 
          margin: '0 0 1rem 0', 
          color: '#64748b',
          fontSize: '0.9rem'
        }}>
          {qualification.completion || qualification.year}
        </p>

        {qualification.description && (
          <p style={{ 
            margin: '0 0 1rem 0', 
            color: '#64748b',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            maxHeight: '3rem',
            overflow: 'hidden'
          }}>
            {qualification.description.substring(0, 100)}
            {qualification.description.length > 100 && '...'}
          </p>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={onEdit}
            style={{
              flex: 1,
              padding: '0.5rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            style={{
              flex: 1,
              padding: '0.5rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Qualification Modal Component (Create/Edit)
function QualificationModal({ qualification, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: qualification?.title || qualification?.degree || '',
    institution: qualification?.institution || qualification?.school || '',
    completion: qualification?.completion || qualification?.year || '',
    description: qualification?.description || ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const qualificationData = { ...formData };

      const url = qualification 
        ? `/api/qualifications/${qualification._id}` 
        : '/api/qualifications';
      
      const method = qualification ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(qualificationData)
      });

      const result = await response.json();

      if (result.success) {
        onSave(result.data);
      } else {
        setError(result.message || 'Failed to save qualification');
      }
    } catch (error) {
      console.error('Error saving qualification:', error);
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: '#374151' }}>
            {qualification ? 'Edit Qualification' : 'Add New Qualification'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            ×
          </button>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Degree/Qualification Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g., Bachelor of Computer Science"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Institution/School *
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              required
              placeholder="e.g., University of Toronto"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Completion Year/Date *
            </label>
            <input
              type="text"
              value={formData.completion}
              onChange={(e) => setFormData({ ...formData, completion: e.target.value })}
              required
              placeholder="e.g., 2025 or May 2025"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="e.g., Relevant coursework, achievements, GPA..."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#e2e8f0',
                color: '#374151',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '0.75rem 1.5rem',
                background: saving ? '#9ca3af' : '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: saving ? 'not-allowed' : 'pointer'
              }}
            >
              {saving ? 'Saving...' : (qualification ? 'Update' : 'Add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteConfirmationModal({ qualification, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#374151' }}>
          Confirm Delete
        </h3>
        <p style={{ margin: '0 0 1.5rem 0', color: '#64748b' }}>
          Are you sure you want to delete{' '}
          <strong>"{qualification.title || qualification.degree}"</strong>{' '}
          from {qualification.institution || qualification.school}?
          This action cannot be undone.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#e2e8f0',
              color: '#374151',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
