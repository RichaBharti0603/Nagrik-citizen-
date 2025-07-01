// src/components/SubmittedIssues.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SubmittedIssues.css";

const SubmittedIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get("https://nagrik-citizen.onrender.com/api/issues");
        setIssues(res.data);
      } catch (err) {
        console.error("Failed to fetch issues", err);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="submitted-issues-container">
      <h3>📋 Submitted Civic Issues</h3>
      <div className="issue-cards-grid">
        {issues.length === 0 ? (
          <p>No issues submitted yet.</p>
        ) : (
          issues.map((issue, index) => (
            <div className="issue-card" key={index}>
              {issue.imageUrl && (
                <img
                  src={issue.imageUrl}
                  alt="Submitted Civic Issue"
                  className="issue-image"
                />
              )}
              <div className="issue-details">
                <h4>{issue.description}</h4>
                <p>
                  <strong>📍 Location:</strong> {issue.location}
                </p>
                <p>
                  <strong>🕒 Date:</strong>{" "}
                  {new Date(issue.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubmittedIssues;
