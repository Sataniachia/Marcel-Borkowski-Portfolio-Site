import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Admin Projects Management Page
 * CRUD operations for portfolio projects - Assignment 3
 */
export default function AdminProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      const result = await response.json();
      
      if (result.success) {
        setProjects(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        setProjects(projects.filter(project => project._id !== projectId));
        setShowDeleteModal(false);
        setProjectToDelete(null);
      } else {
        setError(result.message || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('Network error. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="page-content">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h2>Loading projects...</h2>
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
                Manage Projects
              </h1>
              <p style={{ color: '#64748b', margin: 0 }}>
                Create, edit, and manage your portfolio projects
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
              + Add Project
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

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <div style={{
              background: 'white',
              padding: '3rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#64748b', marginBottom: '1rem' }}>
                No projects yet
              </h3>
              <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
                Create your first project to showcase your work.
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
                Create First Project
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onEdit={() => setEditingProject(project)}
                  onDelete={() => {
                    setProjectToDelete(project);
                    setShowDeleteModal(true);
                  }}
                />
              ))}
            </div>
          )}

          {/* Create/Edit Project Modal */}
          {(showCreateModal || editingProject) && (
            <ProjectModal
              project={editingProject}
              onClose={() => {
                setShowCreateModal(false);
                setEditingProject(null);
              }}
              onSave={(projectData) => {
                if (editingProject) {
                  // Update existing project
                  setProjects(projects.map(p => 
                    p._id === editingProject._id ? { ...p, ...projectData } : p
                  ));
                } else {
                  // Add new project
                  setProjects([projectData, ...projects]);
                }
                setShowCreateModal(false);
                setEditingProject(null);
              }}
            />
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && projectToDelete && (
            <DeleteConfirmationModal
              project={projectToDelete}
              onConfirm={() => handleDeleteProject(projectToDelete._id)}
              onCancel={() => {
                setShowDeleteModal(false);
                setProjectToDelete(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project, onEdit, onDelete }) {
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
      {/* Project Image */}
      <div style={{
        height: '200px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '3rem'
      }}>
        🚀
      </div>

      {/* Project Content */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ 
          margin: '0 0 0.5rem 0', 
          color: '#374151',
          fontSize: '1.2rem'
        }}>
          {project.title}
        </h3>
        
        <p style={{ 
          margin: '0 0 1rem 0', 
          color: '#64748b',
          fontSize: '0.9rem',
          lineHeight: '1.5',
          maxHeight: '3rem',
          overflow: 'hidden'
        }}>
          {project.description?.substring(0, 100)}
          {project.description?.length > 100 && '...'}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  style={{
                    background: '#e2e8f0',
                    color: '#64748b',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem'
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
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

// Project Modal Component (Create/Edit)
function ProjectModal({ project, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    technologies: project?.technologies?.join(', ') || '',
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies
          ? formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
          : []
      };

      const url = project 
        ? `/api/projects/${project._id}` 
        : '/api/projects';
      
      const method = project ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(projectData)
      });

      const result = await response.json();

      if (result.success) {
        onSave(result.data);
      } else {
        setError(result.message || 'Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
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
            {project ? 'Edit Project' : 'Create New Project'}
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
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
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
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
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

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, Node.js, MongoDB"
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
              Live URL
            </label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              placeholder="https://yourproject.com"
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
              GitHub URL
            </label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/username/repo"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '1rem'
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
              {saving ? 'Saving...' : (project ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteConfirmationModal({ project, onConfirm, onCancel }) {
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
          Are you sure you want to delete the project{' '}
          <strong>"{project.title}"</strong>?
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
