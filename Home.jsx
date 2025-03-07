import React from "react";
import { Link } from "react-router-dom";
import "./HomeStyles.css"; // We'll create this stylesheet

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">Welcome to YT SEO Analyzer <span className="rocket">🚀</span></h1>
          <p className="subtitle">Your AI-powered YouTube SEO Optimization Platform</p>
          <div className="cta-buttons">
            <Link to="/youtube-seo-analyzer" className="primary-button">Get Started</Link>
            <Link to="/youtube-seo-guide" className="secondary-button">Learn SEO</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Cartoon-style image placeholder */}
          <div className="cartoon-image">
            <div className="youtube-icon">
              <div className="play-button"></div>
            </div>
            <div className="growth-arrow"></div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>Grow Your Channel with Expert Resources</h2>
        <div className="feature-cards">
          <Link to="/youtube-seo-guide" className="feature-card">
            <div className="card-icon">📊</div>
            <h3>YouTube SEO Guide</h3>
            <p>Master the algorithm with our comprehensive SEO strategies</p>
          </Link>
          
          <Link to="/video-optimization-tips" className="feature-card">
            <div className="card-icon">🎬</div>
            <h3>Optimization Tips</h3>
            <p>Proven techniques to boost your video performance</p>
          </Link>
          
          <Link to="/youtube-case-studies" className="feature-card">
            <div className="card-icon">📈</div>
            <h3>Success Stories</h3>
            <p>Real case studies of channels that skyrocketed growth</p>
          </Link>
          
          </div>
      </div>

      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial-container">
          <div className="testimonial">
            <p>"YT SEO Analyzer helped me double my subscribers in just 3 months!"</p>
            <div className="testimonial-author">- Raj Patel ,RajuBeeKeeper</div>
          </div>
          <div className="testimonial">
            <p>"The SEO tips transformed my channel's visibility. Views up 150%!"</p>
            <div className="testimonial-author">- Anish, factwithai</div>
          </div>
        </div>
      </div>

       </div>
  );
};

export default Home;