import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Admin Contacts Management Page
 * CRUD operations for contact messages - Assignment 3
 */
export default function AdminContacts() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contacts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        setContacts(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        setContacts(contacts.filter(contact => contact._id !== contactId));
        setShowDeleteModal(false);
        setContactToDelete(null);
      } else {
        setError(result.message || 'Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      setError('Network error. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="page">
        <div className="page-content">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h2>Loading contacts...</h2>
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
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
              Contact Messages
            </h1>
            <p style={{ color: '#64748b' }}>
              Manage contact form submissions from portfolio visitors
            </p>
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

          {/* Stats */}
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            marginBottom: '2rem'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>
              Total Messages: {contacts.length}
            </h3>
            <p style={{ margin: 0, color: '#64748b' }}>
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>

          {/* Contacts List */}
          {contacts.length === 0 ? (
            <div style={{
              background: 'white',
              padding: '3rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#64748b', marginBottom: '1rem' }}>
                No contact messages yet
              </h3>
              <p style={{ color: '#9ca3af' }}>
                Contact messages will appear here when visitors submit the contact form.
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {contacts.map((contact) => (
                <ContactCard
                  key={contact._id}
                  contact={contact}
                  onView={() => setSelectedContact(contact)}
                  onDelete={() => {
                    setContactToDelete(contact);
                    setShowDeleteModal(true);
                  }}
                />
              ))}
            </div>
          )}

          {/* Contact Detail Modal */}
          {selectedContact && (
            <ContactDetailModal
              contact={selectedContact}
              onClose={() => setSelectedContact(null)}
            />
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && contactToDelete && (
            <DeleteConfirmationModal
              contact={contactToDelete}
              onConfirm={() => handleDeleteContact(contactToDelete._id)}
              onCancel={() => {
                setShowDeleteModal(false);
                setContactToDelete(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Contact Card Component
function ContactCard({ contact, onView, onDelete }) {
  return (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      gap: '1rem',
      alignItems: 'start'
    }}>
      <div>
        <h3 style={{ 
          margin: '0 0 0.5rem 0', 
          color: '#374151',
          fontSize: '1.1rem'
        }}>
          {contact.firstName} {contact.lastName}
        </h3>
        <p style={{ 
          margin: '0 0 0.5rem 0', 
          color: '#667eea',
          fontSize: '0.9rem'
        }}>
          {contact.email}
        </p>
        <p style={{ 
          margin: '0 0 1rem 0', 
          color: '#64748b',
          fontSize: '0.9rem',
          maxHeight: '3rem',
          overflow: 'hidden',
          lineHeight: '1.5'
        }}>
          {contact.message?.substring(0, 150)}
          {contact.message?.length > 150 && '...'}
        </p>
        <p style={{ 
          margin: 0, 
          color: '#9ca3af',
          fontSize: '0.8rem'
        }}>
          Received: {new Date(contact.created).toLocaleDateString()}
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
        <button
          onClick={onView}
          style={{
            padding: '0.5rem 1rem',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#5a67d8'}
          onMouseOut={(e) => e.target.style.background = '#667eea'}
        >
          View
        </button>
        <button
          onClick={onDelete}
          style={{
            padding: '0.5rem 1rem',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#dc2626'}
          onMouseOut={(e) => e.target.style.background = '#ef4444'}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

// Contact Detail Modal
function ContactDetailModal({ contact, onClose }) {
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
          <h2 style={{ margin: 0, color: '#374151' }}>Contact Details</h2>
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
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
              Name:
            </label>
            <p style={{ margin: 0, color: '#64748b' }}>
              {contact.firstName} {contact.lastName}
            </p>
          </div>
          
          <div>
            <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
              Email:
            </label>
            <p style={{ margin: 0, color: '#64748b' }}>
              {contact.email}
            </p>
          </div>
          
          <div>
            <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
              Message:
            </label>
            <p style={{ 
              margin: 0, 
              color: '#64748b',
              background: '#f8fafc',
              padding: '1rem',
              borderRadius: '4px',
              lineHeight: '1.6'
            }}>
              {contact.message}
            </p>
          </div>
          
          <div>
            <label style={{ fontWeight: '600', color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
              Received:
            </label>
            <p style={{ margin: 0, color: '#64748b' }}>
              {new Date(contact.created).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteConfirmationModal({ contact, onConfirm, onCancel }) {
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
          Are you sure you want to delete the message from{' '}
          <strong>{contact.firstName} {contact.lastName}</strong>?
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
