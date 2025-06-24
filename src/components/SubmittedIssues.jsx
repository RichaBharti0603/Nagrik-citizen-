import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SubmittedIssues.css';

const SubmittedIssues = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/issues");
        setIssues(res.data);
      } catch (err) {
        console.error("Failed to fetch issues", err);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="submitted-issues-container">
      <h2>📋 Submitted Civic Issues</h2>
      {issues.length === 0 ? (
        <p>No issues reported yet.</p>
      ) : (
        issues.map((issue, index) => (
          <div className="issue-card" key={index}>
            <h3>{issue.description}</h3>
            <p><strong>Location:</strong> {issue.location}</p>
            {issue.image && (
              <img
                src={`http://localhost:5000/uploads/${issue.image}`}
                alt="Reported"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SubmittedIssues;
