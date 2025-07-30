/**
 * API Configuration for Development and Production
 * Handles different base URLs for local vs deployed environments
 */

// Determine the base URL based on environment
const getBaseUrl = () => {
  // In production, use relative URLs (same domain)
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Fallback
  return '';
};

const BASE_URL = getBaseUrl();

/**
 * API utility for making requests
 */
export const api = {
  /**
   * Make an authenticated request
   */
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      
      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', {
        endpoint,
        error: error.message,
        options
      });
      throw error;
    }
  },

  // Auth endpoints
  auth: {
    signin: (credentials) => 
      api.request('/auth/signin', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    
    signout: () => 
      api.request('/auth/signout', {
        method: 'GET',
      }),
  },

  // User endpoints
  users: {
    register: (userData) =>
      api.request('/api/users/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    
    getProfile: () =>
      api.request('/api/users/profile'),
  },

  // Contact endpoints
  contacts: {
    getAll: () => api.request('/api/contacts'),
    
    create: (contactData) =>
      api.request('/api/contacts', {
        method: 'POST',
        body: JSON.stringify(contactData),
      }),
    
    delete: (id) =>
      api.request(`/api/contacts/${id}`, {
        method: 'DELETE',
      }),
  },

  // Project endpoints
  projects: {
    getAll: () => api.request('/api/projects'),
    
    create: (projectData) =>
      api.request('/api/projects', {
        method: 'POST',
        body: JSON.stringify(projectData),
      }),
    
    update: (id, projectData) =>
      api.request(`/api/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
      }),
    
    delete: (id) =>
      api.request(`/api/projects/${id}`, {
        method: 'DELETE',
      }),
  },

  // Qualification endpoints
  qualifications: {
    getAll: () => api.request('/api/qualifications'),
    
    create: (qualificationData) =>
      api.request('/api/qualifications', {
        method: 'POST',
        body: JSON.stringify(qualificationData),
      }),
    
    update: (id, qualificationData) =>
      api.request(`/api/qualifications/${id}`, {
        method: 'PUT',
        body: JSON.stringify(qualificationData),
      }),
    
    delete: (id) =>
      api.request(`/api/qualifications/${id}`, {
        method: 'DELETE',
      }),
  },
};

export default api;
