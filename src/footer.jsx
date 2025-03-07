import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Make sure to create this CSS file

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">YT SEO Analyzer</h3>
            <p className="footer-description">
              Your ultimate resource for YouTube growth strategies, SEO optimization, 
              and channel analytics to help you succeed on the platform.
            </p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/youtube-seo-guide">SEO Guide</Link></li>
              <li><Link to="/video-optimization-tips">Optimization Tips</Link></li>
              <li><Link to="/youtube-case-studies">Case Studies</Link></li>
              <li><Link to="/ai-in-youtube-seo">AI in SEO</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-contact">
              <li><i className="fas fa-envelope"></i> youtubanish@gmail.com</li></ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© {currentYear} YT SEO Analyzer. All rights reserved.</p>
          <div className="legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-conditions">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
