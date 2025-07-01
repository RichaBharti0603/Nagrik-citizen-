import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyDashboard.css";

function MyDashboard() {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserIssues = async () => {
      try {
        const email = localStorage.getItem("email");
        const res = await axios.get(
          `http://localhost:5000/api/issues?submittedBy=${encodeURIComponent(email)}`
        );
        setIssues(res.data);
      } catch (err) {
        setError("Failed to load your issues.");
      }
    };

    fetchUserIssues();
  }, []);

  return (
    <div className="my-dashboard-container">
      <h2>My Reported Issues</h2>
      {error && <p className="error">{error}</p>}
      {issues.length === 0 && <p>No issues submitted yet.</p>}

      <div className="issues-list">
        {issues.map((issue) => (
          <div key={issue._id} className="issue-card">
            {issue.imageUrl && (
              <img src={`http://localhost:5000${issue.imageUrl}`} alt="Issue" />
            )}
            <div className="issue-info">
              <h3>{issue.title}</h3>
              <p><strong>Category:</strong> {issue.category}</p>
              <p><strong>Priority:</strong> {issue.priority}</p>
              <p><strong>Status:</strong> {issue.status}</p>
              <p><strong>Date:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
              {issue.location && <p><strong>Location:</strong> {issue.location}</p>}
              {issue.description && <p><strong>Description:</strong> {issue.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyDashboard;
