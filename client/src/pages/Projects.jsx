/**
 * Projects page component displaying portfolio work
 * Shows at least 3 projects with images and descriptions
 */
export default function Projects() {
  // Sample project data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: "Academic Grade Management System",
      description: "A comprehensive desktop application built in C# with a custom UI for managing academic coursework. Users can upload and organize classes by semester, track assignments, quizzes, and tests with due dates and custom weighting. The system automatically calculates total grades based on weighting percentages and includes robust exception handling to prevent invalid data entry.",
      role: "Solo Developer",
      outcome: "Fully functional grade tracking system with data validation and user-friendly interface",
      technologies: "C#, Windows Forms/WPF, Object-Oriented Programming, Exception Handling",
      image: "https://via.placeholder.com/400x250/667eea/ffffff?text=C%23+Grade+Management" // Placeholder - replace with actual project image
    },
    {
      id: 2,
      title: "Healthcare Web Application - SRS Documentation",
      description: "Comprehensive Software Requirements Specification (SRS) document for a healthcare web application. Created detailed system architecture including Data Context Diagrams (DCD), Model-View-Controller (MVC) diagrams, use cases, and user stories. The document provides complete technical specifications for a patient management and healthcare delivery system.",
      role: "Systems Analyst & Technical Writer",
      outcome: "Professional-grade SRS documentation ready for development team implementation",
      technologies: "Systems Analysis, UML Diagrams, Use Case Design, Technical Documentation, MVC Architecture",
      image: "https://via.placeholder.com/400x250/764ba2/ffffff?text=Healthcare+SRS" // Placeholder - replace with actual project image
    },
    {
      id: 3,
      title: "Personal Portfolio Website",
      description: "A full-stack web application showcasing my development skills and projects. Built with React for the frontend and Node.js/Express for the backend. Features responsive design, contact form functionality, project galleries, and professional presentation of technical skills. Demonstrates modern web development practices including component-based architecture and API integration.",
      role: "Full-Stack Developer",
      outcome: "Professional portfolio website deployed and ready for showcasing work to potential employers and clients",
      technologies: "React, Node.js, Express, JavaScript, HTML5, CSS3, Responsive Design, Git, Vite",
      image: "https://via.placeholder.com/400x250/2196F3/ffffff?text=Portfolio+Website" // Placeholder - replace with actual project image
    }
  ];

  return (
    <div className="page">
      <div className="page-content">
        <h1 style={{ textAlign: 'center', color: '#667eea', marginBottom: '3rem' }}>
          My Projects
        </h1>
        <p style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
          Here are some of the projects I've worked on that showcase my skills and experience. 
          Each project demonstrates different aspects of my development capabilities and problem-solving approach.
        </p>

        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              {/* Project Image */}
              <div className="project-image">
                <img 
                  src={project.image} 
                  alt={`${project.title} project screenshot`}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    borderRadius: '8px 8px 0 0'
                  }}
                />
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p style={{ marginBottom: '1rem' }}>{project.description}</p>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#764ba2' }}>My Role:</strong>
                  <p style={{ margin: '0.5rem 0' }}>{project.role}</p>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#764ba2' }}>Outcome:</strong>
                  <p style={{ margin: '0.5rem 0' }}>{project.outcome}</p>
                </div>
                
                <div>
                  <strong style={{ color: '#764ba2' }}>Technologies Used:</strong>
                  <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    {project.technologies}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <section style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem', background: 'white', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>Interested in Working Together?</h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            I'm always open to discussing new projects and opportunities. Let's create something amazing together!
          </p>
          <a href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
            Get In Touch
          </a>
        </section>
      </div>
    </div>
  );
}
