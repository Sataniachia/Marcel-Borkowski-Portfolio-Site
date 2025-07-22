import { Link } from 'react-router-dom';

/**
 * Home page component for the personal portfolio
 * Features welcome message, mission statement, and call-to-action
 */
export default function Home() {
  return (
    <div className="page">
      <div className="page-content">
        {/* Hero section with welcome message */}
        <section className="hero">
          <h1>Welcome to My Professional Portfolio</h1>
          <p>
            Hi, I'm Marcel! I'm a passionate developer dedicated to creating 
            innovative solutions and building exceptional digital experiences.
          </p>
          <Link to="/about" className="btn-primary">
            Learn More About Me
          </Link>
        </section>

        {/* Mission Statement */}
        <section style={{ background: 'white', padding: '3rem', borderRadius: '10px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#667eea', marginBottom: '1.5rem' }}>My Mission</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
            To leverage cutting-edge technology and creative problem-solving to deliver 
            high-quality software solutions that make a meaningful impact. I believe in 
            continuous learning, collaboration, and writing clean, maintainable code that 
            stands the test of time.
          </p>
        </section>

        {/* Quick navigation cards */}
        <section style={{ marginTop: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <Link to="/projects" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
                <h3 style={{ color: '#667eea' }}>View Projects</h3>
                <p>Explore my portfolio of completed work</p>
              </div>
            </Link>
            <Link to="/services" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                <h3 style={{ color: '#667eea' }}>My Services</h3>
                <p>Discover what I can do for you</p>
              </div>
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '10px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
                <h3 style={{ color: '#667eea' }}>Get In Touch</h3>
                <p>Let's discuss your next project</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}