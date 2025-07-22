import profileImage from '../assets/images/IMG_1231.jpg';

/**
 * About page component for the personal portfolio
 * Displays professional information, profile image, and resume download
 */
export default function About() {
  return (
    <div className="page">
      <div className="page-content">
        <div className="about-container">
          {/* Profile Image Section */}
          <div>
            {/* Professional headshot */}
            <img 
              src={profileImage} 
              alt="Marcel Borkowski - Professional headshot"
              className="profile-image" 
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
          </div>

          {/* About Text Section */}
          <div className="about-text">
            <h1>About Marcel</h1>
            <p>
              <strong>Marcel Borkowski</strong> - I'm a software developer who's genuinely curious 
              about how things work. Currently studying JavaScript Programming and building up my 
              skills in modern web development. I like getting into the details of things.
            </p>
            <p>
              What drives me is this need to understand the logic behind everything - whether it's 
              figuring out why my code isn't working, understanding the science behind nutrition, 
              or breaking down fight techniques in MMA training. I take the same approach to 
              problem-solving whether I'm debugging or perfecting a new recipe.
            </p>
            <p>
              Training MMA has taught me that consistency beats intensity - you get better by 
              showing up every day, not just when you feel like it. Same thing applies to coding. 
              I'm not trying to be the smartest person in the room, I just want to write code 
              that actually works and makes sense.
            </p>
            <p>
              When I'm not coding, I spend time cooking (there's real science behind good food), 
              reading about history, and watching shows that are actually well-written - stuff like 
              The Sopranos or Better Call Saul. I'm the type of person who gets fascinated by how 
              things work, whether it's exercise physiology or why certain TV shows just hit different.
            </p>
            <p>
              <strong>Currently:</strong> Studying JavaScript Programming<br/>
              <strong>What I'm into:</strong> MMA training, cooking, history books, quality TV, 
              understanding nutrition and exercise science<br/>
              <strong>Tech-wise:</strong> Full-stack development, figuring out problems, understanding code logic
            </p>
            
            {/* Resume Download Button */}
            <a href="/Resume.pdf" className="resume-btn" download>
              📄 Download My Resume
            </a>
          </div>
        </div>

        {/* Skills Section */}
        <section style={{ marginTop: '4rem', background: 'white', padding: '3rem', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', color: '#667eea', marginBottom: '2rem' }}>Technical Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <h3 style={{ color: '#764ba2' }}>Frontend</h3>
              <p>React, JavaScript, HTML5, CSS3, Responsive Design</p>
            </div>
            <div>
              <h3 style={{ color: '#764ba2' }}>Backend</h3>
              <p>Node.js, Express, RESTful APIs, Database Design</p>
            </div>
            <div>
              <h3 style={{ color: '#764ba2' }}>Tools & Others</h3>
              <p>Git, VS Code, Agile Development, Problem Solving</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
