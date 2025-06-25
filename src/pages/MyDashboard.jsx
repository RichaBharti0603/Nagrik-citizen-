import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Assumes it's stored at login
    axios.get(`http://localhost:5000/api/user/${userId}/dashboard`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <p>Loading your dashboard...</p>;

  return (
    <div className="dashboard-container">
      <h1>👤 Welcome, {data.name}</h1>
      <p>Email: {data.email}</p>

      <h2>📌 Your Reported Issues</h2>
      <ul>
        {data.issuesReported.length === 0 ? <li>No issues yet</li> :
          data.issuesReported.map(issue => (
            <li key={issue._id}>{issue.title || issue.description}</li>
          ))}
      </ul>

      <h2>🗳 Polls You Voted In</h2>
      <ul>
        {data.votedPolls.length === 0 ? <li>No polls voted yet</li> :
          data.votedPolls.map(poll => (
            <li key={poll._id}>{poll.question}</li>
          ))}
      </ul>

      <h2>💬 Feedback You Submitted</h2>
      <ul>
        {data.feedback.length === 0 ? <li>No feedback given yet</li> :
          data.feedback.map(fb => (
            <li key={fb._id}>{fb.message}</li>
          ))}
      </ul>
    </div>
  );
}

export default MyDashboard;
