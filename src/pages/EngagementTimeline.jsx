// src/pages/EngagementTimeline.jsx
import React from "react";
import "./EngagementTimeline.css";

const EngagementTimeline = () => {
  const timelineData = [
    {
      title: "Smart Traffic Initiative",
      phase: "Public Feedback",
      date: "June 15 - July 10, 2025",
      description:
        "The city invites public feedback on the new smart traffic management system planned for the central district.",
    },
    {
      title: "Park Renovation Plan",
      phase: "Planning Phase",
      date: "Ongoing",
      description:
        "Renovation of Rajendra Park to include open gyms, new lighting, and better walkways.",
    },
    {
      title: "Urban Clean Air Campaign",
      phase: "Execution Phase",
      date: "Started June 1, 2025",
      description:
        "Multi-phase initiative to increase tree cover and reduce emissions from local transportation systems.",
    },
  ];

  return (
    <div className="timeline-container">
      <h2>📍 Civic Engagement Timeline</h2>
      <p className="subtext">
        Stay informed about current and upcoming civic projects in your area.
      </p>
      <div className="timeline-list">
        {timelineData.map((item, index) => (
          <div key={index} className="timeline-card">
            <h3>{item.title}</h3>
            <p><strong>Phase:</strong> {item.phase}</p>
            <p><strong>Date:</strong> {item.date}</p>
            <p className="desc">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngagementTimeline;
