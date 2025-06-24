import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminView = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/issues")
      .then(res => setIssues(res.data))
      .catch(err => console.error(err));
  }, []);

  const updateStatus = (id, newStatus) => {
    axios.put(`http://localhost:5000/api/issues/${id}/status`, { status: newStatus })
      .then(() => {
        setIssues(prev =>
          prev.map(issue =>
            issue._id === id ? { ...issue, status: newStatus } : issue
          )
        );
      });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🛠 Admin: Manage Reported Issues</h2>
      {issues.map(issue => (
        <div key={issue._id} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <p><strong>Status:</strong> {issue.status}</p>
          <select
            value={issue.status}
            onChange={(e) => updateStatus(issue._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminView;
