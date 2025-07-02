import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

// Pages
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CivicDashboard from "./pages/CivicDashboard";
import AdminView from "./pages/AdminView";
import Polls from "./pages/Polls";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyDashboard from './pages/MyDashboard';
import PublicSchemes from "./pages/PublicSchemes";
import PublicEngagement from "./pages/PublicEngagement";
import PublicMeetings from "./pages/PublicMeetings";
import EngagementTimeline from './pages/EngagementTimeline';
import ParticipateHub from './pages/ParticipateHub';
import GeoMapVisualizer from './pages/GeoMapVisualizer';
import CampaignFilter from './pages/CampaignFilter';
import PublicNotices from './pages/PublicNotices';
import AdminContentManager from './pages/AdminContentManager';
import AuthModal from './components/AuthModal';
import ReportIssue from "./pages/ReportIssue";

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("seenWelcomeAlert")) {
      alert("🚨 Welcome to Nagrik – Empowering Civic Engagement!");
      localStorage.setItem("seenWelcomeAlert", "true");
    }

    const token = localStorage.getItem("token");
    const guest = localStorage.getItem("guest");

    let timer;
    if (!token && !guest) {
      timer = setTimeout(() => {
        setShowAuthModal(true);
      }, 60000); // 1 minute
    }

    return () => {
      if (timer) clearTimeout(timer); // cleanup
    };
  }, []);

  return (
    <Router>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      <header className="main-header">
        <div className="nav-wrapper">
          <Link to="/">🏠 Home</Link>
          <Link to="/report">📌 Report Issue</Link>
          <Link to="/dashboard">📊 Civic Dashboard</Link>
          <Link to="/mydashboard">🙋🏻 My Dashboard</Link>
          <Link to="/polls">🗳 Polls</Link>
          <Link to="/admin">🔧 Admin Panel</Link>
          <Link to="/schemes">🏛 Schemes</Link>
          <Link to="/meetings">📅 Meetings</Link>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/dashboard" element={<CivicDashboard />} />
          <Route path="/mydashboard" element={<MyDashboard />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/schemes" element={<PublicSchemes />} />
          <Route path="/engagement" element={<PublicEngagement />} />
          <Route path="/engagement-timeline" element={<EngagementTimeline />} />
          <Route path="/participate" element={<ParticipateHub />} />
          <Route path="/geo-map" element={<GeoMapVisualizer />} />
          <Route path="/campaigns" element={<CampaignFilter />} />
          <Route path="/notices" element={<PublicNotices />} />
          <Route path="/admin-content" element={<AdminContentManager />} />
          <Route path="/meetings" element={<PublicMeetings />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
