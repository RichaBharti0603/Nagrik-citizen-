import React, { useEffect, useState } from "react";
import axios from "axios";

const Polls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/polls")
      .then(res => setPolls(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleVote = (pollId, option) => {
    axios.post(`http://localhost:5000/api/polls/${pollId}/vote`, { option })
      .then(res => {
        setPolls(prev =>
          prev.map(p => (p._id === pollId ? res.data : p))
        );
      });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>🗳 Citizen Polls</h2>
      {polls.map(poll => (
        <div key={poll._id} style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #ccc" }}>
          <h4>{poll.question}</h4>
          {poll.options.map(option => (
            <button
              key={option}
              onClick={() => handleVote(poll._id, option)}
              style={{ marginRight: "0.5rem" }}
            >
              {option} ({poll.votes[option]})
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Polls;
