import { Link } from 'react-router-dom';

/**
 * Navigation component for the portfolio website
 * Includes custom logo and navigation links to all pages
 */
export default function Navbar() {
  return (
    <nav>
      <div className="nav-container">
        {/* Custom Logo - Simple geometric design with initials */}
        <Link to="/" className="logo">
          MB
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}