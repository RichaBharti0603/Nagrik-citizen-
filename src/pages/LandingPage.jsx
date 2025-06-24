import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="hero">
        <h1>🧭 Welcome to <span>Nagrik</span></h1>
        <p>Empowering citizens through technology & civic participation.</p>
        <div className="cta-buttons">
          <Link to="/report" className="btn">📌 Report an Issue</Link>
          <Link to="/dashboard" className="btn">📊 Civic Dashboard</Link>
          <Link to="/polls" className="btn">🗳 Citizen Polls</Link>
        </div>
      </header>

      <section className="features">
        <h2>✨ Platform Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📌 Report Issues</h3>
            <p>Help authorities by reporting civic issues in your locality.</p>
          </div>
          <div className="feature-card">
            <h3>📢 Real-Time News</h3>
            <p>Stay updated with verified local news and alerts.</p>
          </div>
          <div className="feature-card">
            <h3>🗳 Civic Polls</h3>
            <p>Voice your opinion on public matters through polls.</p>
          </div>
          <div className="feature-card">
            <h3>📚 Public Schemes</h3>
            <p>Access information on government schemes and resources.</p>
          </div>
          <div className="feature-card">
            <h3>👥 Admin Dashboard</h3>
            <p>Authorities can view, manage and resolve reported issues.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Nagrik. Built with ❤️ for Code for Bharat.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
