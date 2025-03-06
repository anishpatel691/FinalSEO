import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ textAlign: "center", padding: "20px",  marginTop: "20px" }}>
      <p>© {new Date().getFullYear()} YT SEO Analyzer. All rights reserved.</p>
      <Link to="/privacy-policy" style={{ marginRight: "15px" }}>Privacy Policy</Link>
      <Link to="/terms-conditions">Terms & Conditions</Link>
    </footer>
  );
};

export default Footer;
