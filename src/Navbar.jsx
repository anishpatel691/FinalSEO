import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS for styling

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo-container">
          <h2 className="logo">YT SEO Analyzer</h2>
        </Link>

        {/* Mobile menu button */}
        <div className="menu-icon" onClick={toggleMobileMenu}>
          <div className={`menu-icon-bar ${mobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`menu-icon-bar ${mobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`menu-icon-bar ${mobileMenuOpen ? 'open' : ''}`}></div>
        </div>

        {/* Navigation links */}
        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/youtube-seo-guide" className="nav-link" onClick={() => setMobileMenuOpen(false)}>SEO Guide</Link>
          <Link to="/video-optimization-tips" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Optimization Tips</Link>
          <Link to="/youtube-case-studies" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Case Studies</Link>
          
          <div className="nav-dropdown">
            <button className="nav-dropdown-btn">Legal</button>
            <div className="dropdown-content">
              <Link to="/privacy-policy" onClick={() => setMobileMenuOpen(false)}>Privacy Policy</Link>
              <Link to="/terms-conditions" onClick={() => setMobileMenuOpen(false)}>Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;