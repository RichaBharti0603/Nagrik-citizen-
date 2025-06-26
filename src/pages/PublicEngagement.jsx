import React, { useEffect, useState } from "react";

const PublicEngagement = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetch("/api/publicinput/surveys")
      .then((res) => res.json())
      .then((data) => setSurveys(data));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📢 Ongoing Civic Engagement Surveys</h2>
      <ul>
        {surveys.map((s) => (
          <li key={s.id}>
            <a href={s.public_url} target="_blank" rel="noopener noreferrer">
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicEngagement;
