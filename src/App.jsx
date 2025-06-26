import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home"; // 📝 Report Issue page
import CivicDashboard from "./pages/CivicDashboard";
import AdminView from "./pages/AdminView";
import Polls from "./pages/Polls";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyDashboard from './pages/MyDashboard'; // 👤 User-specific dashboard
import PublicSchemes from "./pages/PublicSchemes"; // Add this
import PublicEngagement from "./pages/PublicEngagement";
import PublicMeetings from "./pages/PublicMeetings"; 
import EngagementTimeline from './pages/EngagementTimeline';
import ParticipateHub from './pages/ParticipateHub';
import GeoMapVisualizer from './pages/GeoMapVisualizer';
import CampaignFilter from './pages/CampaignFilter';
import PublicNotices from './pages/PublicNotices';
import AdminContentManager from './pages/AdminContentManager';


function App() {
  return (
    <Router>
      <header style={{ background: "#f0f0f0", padding: "1rem", textAlign: "center" }}>
        <nav style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/">🏠 Home</Link>
          <Link to="/report">📌 Report Issue</Link>
          <Link to="/dashboard">📊 Civic Dashboard</Link>
          <Link to="/mydashboard">👤 My Dashboard</Link>
          <Link to="/polls">🗳 Polls</Link>
          <Link to="/admin">🔧 Admin Panel</Link>
          <Link to="/schemes">🏛 Schemes</Link>
          <Link to="/meetings">📅 Meetings</Link>

        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/report" element={<Home />} />
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
