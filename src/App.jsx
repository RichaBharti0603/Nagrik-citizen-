import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home"; // 📝 This is your Report Issue page, shown at /report
import CivicDashboard from "./pages/CivicDashboard";
import AdminView from "./pages/AdminView";
import Polls from "./pages/Polls";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <header style={{ background: "#f0f0f0", padding: "1rem", textAlign: "center" }}>
        <nav style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/">🏠 Home</Link>
          <Link to="/report">📌 Report Issue</Link>
          <Link to="/dashboard">📊 Dashboard</Link>
          <Link to="/polls">🗳 Polls</Link>
          <Link to="/admin">🔧 Admin Panel</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/report" element={<Home />} />
          <Route path="/dashboard" element={<CivicDashboard />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
