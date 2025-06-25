import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "ta", label: "தமிழ்" },
  { code: "mr", label: "मराठी" },
];

function LandingPage() {
  const [showModal, setShowModal] = useState(true);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [email, setEmail] = useState("");

  const motivationalQuotes = [
    "“Be the change you want to see in the world.” – Mahatma Gandhi",
    "“The best way to find yourself is to lose yourself in the service of others.”",
    "“A good citizen is one who contributes to society.”",
    "“Technology + Civic Will = Powerful Change.”",
    "“Your voice matters. Raise it wisely.”",
  ];
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      const browserLang = navigator.language.slice(0, 2);
      const supported = languages.find((l) => l.code === browserLang);
      if (supported) {
        setLanguage(supported.code);
        localStorage.setItem("language", supported.code);
      }
    }
  }, []);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    localStorage.setItem("language", lang);
    setLanguage(lang);
    window.location.reload();
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing, ${email}`);
    setEmail("");
  };

  const user = localStorage.getItem("nagrikUser");

  return (
    <div className="landing-container">
      {/* Welcome Modal */}
      {showModal && (
        <div className="welcome-modal">
          <div className="modal-content">
            <h2>👋 Welcome to Nagrik</h2>
            <p className="quote">{randomQuote}</p>
            <button onClick={() => setShowModal(false)}>🚀 Continue to Nagrik</button>
          </div>
        </div>
      )}

      {/* Top Login/Signup or Welcome */}
      <div className="topbar">
        <div className="welcome-message">
          {user ? (
            <>
              👋 Welcome, <strong>{user}</strong>
              <button onClick={() => {
                localStorage.removeItem("nagrikUser");
                window.location.reload();
              }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="top-link">Login</Link>
              <Link to="/signup" className="top-link">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <header className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>🧭 Welcome to <span>Nagrik</span></h1>
            <p>Empowering citizens through technology & civic participation.</p>

            <div className="language-selector">
              <label>🌐 Choose Language: </label>
              <select onChange={handleLanguageChange} value={language}>
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
              </select>
            </div>

            <div className="cta-buttons">
              <Link to="/report" className="btn">📌 Report an Issue</Link>
              <Link to="/dashboard" className="btn">📊 Civic Dashboard</Link>
              <Link to="/polls" className="btn">🗳 Citizen Polls</Link>
            </div>
          </div>

          <div className="hero-image">
            <img src="/welcome-banner.jpg" alt="Welcome" />
          </div>
        </div>
      </header>

      {/* Civic Theory */}
      <section className="theory-section">
        <h2>📖 What is Civic Engagement?</h2>
        <p>Civic engagement is about making a difference in the civic life of our communities and developing the knowledge and skills to make that difference.</p>

        <h2>🤝 Why Do We Need Civic Tech?</h2>
        <p>Civic tech bridges the gap between citizens and governments. It enables transparency, accountability, and improved service delivery.</p>

        <h2>🌍 What Nagrik Offers</h2>
        <ul>
          <li>Real-time issue reporting and monitoring</li>
          <li>Live news and alerts relevant to citizens</li>
          <li>Direct communication with civic authorities</li>
          <li>Empowerment through education, resources, and schemes</li>
          <li>Multilingual support for inclusivity</li>
        </ul>

        <h2>🛠 Upcoming Features</h2>
        <ul>
          <li>📌 Location-based civic alerts</li>
          <li>🧾 RTI/Grievance tracking portal</li>
          <li>🗺 Interactive city maps with live civic activity</li>
          <li>🤖 AI-based suggestion box for improvements</li>
          <li>📊 Real-time dashboards for authorities</li>
        </ul>
      </section>

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

      <section className="newsletter">
        <h2>📬 Get Civic Updates</h2>
        <form onSubmit={handleNewsletterSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <section className="top-concerns">
        <h2>🔥 Top Civic Concerns This Week</h2>
        <ul>
          <li>🚧 Road damage reported in 5 cities</li>
          <li>💧 Water supply issues in northern districts</li>
          <li>🌳 Tree plantation drives by youth</li>
          <li>🗑 Cleanliness concerns around city markets</li>
        </ul>
      </section>

      <footer className="footer">
        <p>© 2025 Nagrik. Built with ❤️ for Code for Bharat.</p>
        <Link to="/feedback" className="footer-link">💬 Give Feedback</Link>
      </footer>
    </div>
  );
}

export default LandingPage;
