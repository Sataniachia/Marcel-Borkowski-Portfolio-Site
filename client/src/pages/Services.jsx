/**
 * Services page component displaying offered development services
 * Features service cards with icons and descriptions
 */
export default function Services() {
  // Services offered - customize based on your skills
  const services = [
    {
      id: 1,
      title: "Web Development",
      icon: "🌐",
      description: "Full-stack web application development using modern frameworks like React, Node.js, and Express. Responsive design, performance optimization, and SEO-friendly solutions.",
      features: ["Custom Web Applications", "Responsive Design", "API Integration", "Performance Optimization"]
    },
    {
      id: 2,
      title: "Mobile App Development",
      icon: "📱",
      description: "Cross-platform mobile applications using React Native and modern development tools. User-friendly interfaces with seamless performance across iOS and Android.",
      features: ["Cross-Platform Apps", "Native Performance", "Push Notifications", "Offline Functionality"]
    },
    {
      id: 3,
      title: "Frontend Development",
      icon: "🎨",
      description: "Modern, interactive user interfaces with focus on user experience and accessibility. Clean, maintainable code that brings designs to life.",
      features: ["React Applications", "Interactive UI/UX", "CSS Animations", "Accessibility Standards"]
    },
    {
      id: 4,
      title: "Backend Development",
      icon: "⚙️",
      description: "Robust server-side solutions, RESTful APIs, and database design. Scalable architecture with security best practices and efficient data management.",
      features: ["RESTful APIs", "Database Design", "Server Configuration", "Security Implementation"]
    },
    {
      id: 5,
      title: "Code Review & Consulting",
      icon: "🔍",
      description: "Professional code review services, architecture consulting, and development best practices guidance. Help optimize existing codebases and improve development workflows.",
      features: ["Code Quality Assessment", "Architecture Review", "Performance Analysis", "Best Practices Guidance"]
    },
    {
      id: 6,
      title: "Technical Support",
      icon: "🛠️",
      description: "Ongoing technical support, bug fixes, and feature enhancements for existing applications. Maintenance services to keep your applications running smoothly.",
      features: ["Bug Fixes", "Feature Updates", "Performance Monitoring", "Technical Documentation"]
    }
  ];

  return (
    <div className="page">
      <div className="page-content">
        <h1 style={{ textAlign: 'center', color: '#667eea', marginBottom: '2rem' }}>
          My Services
        </h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
          I offer a comprehensive range of development services to help bring your ideas to life. 
          From concept to deployment, I'm here to support your digital journey with quality solutions.
        </p>

        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>{service.title}</h3>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>{service.description}</p>
              
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
                {service.features.map((feature, index) => (
                  <li key={index} style={{ 
                    marginBottom: '0.5rem', 
                    paddingLeft: '1.5rem', 
                    position: 'relative',
                    color: '#555'
                  }}>
                    <span style={{ 
                      position: 'absolute', 
                      left: 0, 
                      color: '#4CAF50',
                      fontWeight: 'bold'
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pricing/Contact Information */}
        <section style={{ 
          marginTop: '4rem', 
          padding: '3rem', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          borderRadius: '10px', 
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Ready to Start Your Project?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
            Every project is unique, and I provide customized solutions tailored to your specific needs. 
            Let's discuss your requirements and create a solution that exceeds your expectations.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="/contact" 
              style={{ 
                background: 'white', 
                color: '#667eea', 
                padding: '12px 30px', 
                borderRadius: '25px', 
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'transform 0.3s ease'
              }}
            >
              Get a Quote
            </a>
            <a 
              href="/projects" 
              style={{ 
                background: 'transparent', 
                color: 'white', 
                padding: '12px 30px', 
                borderRadius: '25px', 
                textDecoration: 'none',
                border: '2px solid white',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              View My Work
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
