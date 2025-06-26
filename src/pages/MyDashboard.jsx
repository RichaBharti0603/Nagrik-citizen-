import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyDashboard.css"; // Optional external CSS for styling

const MyDashboard = () => {
  const [userStats, setUserStats] = useState({
    totalIssues: 0,
    pollsVoted: 0,
    location: "",
    alerts: [],
    schemes: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("/api/user/dashboard");
        setUserStats(res.data);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">👤 My Civic Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📌 Issues Reported</h3>
          <p>{userStats.totalIssues}</p>
        </div>

        <div className="dashboard-card">
          <h3>🗳 Polls Participated</h3>
          <p>{userStats.pollsVoted}</p>
        </div>

        <div className="dashboard-card">
          <h3>📍 Your Location</h3>
          <p>{userStats.location || "Unknown"}</p>
        </div>

        <div className="dashboard-card wide">
          <h3>🛡️ Latest Civic Alerts</h3>
          <ul>
            {userStats.alerts.length === 0 ? (
              <li>No recent alerts</li>
            ) : (
              userStats.alerts.map((alert, index) => (
                <li key={index}>{alert}</li>
              ))
            )}
          </ul>
        </div>

        <div className="dashboard-card wide">
          <h3>📢 Public Schemes for You</h3>
          <ul>
            {userStats.schemes.length === 0 ? (
              <li>No recommended schemes yet.</li>
            ) : (
              userStats.schemes.map((scheme, index) => (
                <li key={index}>
                  <strong>{scheme.title}</strong>: {scheme.description}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;
