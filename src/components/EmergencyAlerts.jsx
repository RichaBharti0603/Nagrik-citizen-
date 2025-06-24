import React, { useEffect, useState } from "react";

const mockAlerts = [
  {
    id: 1,
    title: "Flood Alert in Patna",
    type: "Flood",
    location: "Patna, Bihar",
    date: "2025-06-23",
  },
  {
    id: 2,
    title: "Garbage fire reported near Sector 22",
    type: "Fire",
    location: "Noida, UP",
    date: "2025-06-22",
  },
];

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Use actual API later
    setAlerts(mockAlerts);
  }, []);

  return (
    <div style={{ padding: "1rem", background: "#fff0f0", marginBottom: "2rem", borderRadius: "8px" }}>
      <h2>🚨 Emergency Alerts</h2>
      {alerts.map((alert) => (
        <div key={alert.id} style={{ border: "1px solid #f00", padding: "0.8rem", marginBottom: "1rem", background: "#ffe5e5" }}>
          <strong>{alert.title}</strong>
          <p>{alert.type} | {alert.location}</p>
          <small>{alert.date}</small>
        </div>
      ))}
    </div>
  );
};

export default EmergencyAlerts;
