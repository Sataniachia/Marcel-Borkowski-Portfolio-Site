import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Contact page component with contact information and interactive form
 * Includes form validation and redirect functionality
 */
export default function Contact() {
  const navigate = useNavigate();
  
  // Form state management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form processing
    setTimeout(() => {
      // Log form data (in real app, this would be sent to a server)
      console.log('Form submitted:', formData);
      
      // Show success message and redirect to home
      alert(`Thank you ${formData.firstName}! Your message has been received. I'll get back to you soon.`);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
      
      setIsSubmitting(false);
      
      // Redirect to home page
      navigate('/');
    }, 1000);
  };

  return (
    <div className="page">
      <div className="page-content">
        <h1 style={{ textAlign: 'center', color: '#667eea', marginBottom: '3rem' }}>
          Get In Touch
        </h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          I'd love to hear from you! Whether you have a project idea, need technical consultation, 
          or just want to connect, feel free to reach out.
        </p>

        <div className="contact-container">
          {/* Contact Information Panel */}
          <div className="contact-info">
            <h2 style={{ color: '#667eea', marginBottom: '2rem' }}>Contact Information</h2>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#764ba2', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📧 Email
              </h3>
              <p style={{ fontSize: '1.1rem' }}>marcel.borkowski10@gmail.com</p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#764ba2', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📱 Phone
              </h3>
              <p style={{ fontSize: '1.1rem' }}>+1 (647) 914-3646</p>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#764ba2', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📍 Location
              </h3>
              <p style={{ fontSize: '1.1rem' }}>Scarborough, Ontario</p>
            </div>

            <div style={{ padding: '1.5rem', background: '#f8f9ff', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
              <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Response Time</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                I typically respond to messages within 24 hours during business days.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2 style={{ color: '#667eea', marginBottom: '2rem' }}>Send Me a Message</h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or how I can help you..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '1.1rem',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
