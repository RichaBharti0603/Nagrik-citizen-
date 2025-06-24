import React, { useEffect, useState } from "react";

function CivicAlerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        // Example: Replace with actual alert source (weather/Gov API)
        const res = await fetch("https://api.weatherapi.com/v1/alerts.json?key=YOUR_API_KEY&q=India");
        const data = await res.json();
        setAlerts(data.alerts || []);
      } catch (error) {
        console.error("Error fetching alerts", error);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="civic-alerts">
      <h2>🚨 Civic Alerts</h2>
      {alerts.length === 0 ? (
        <p>No active alerts currently.</p>
      ) : (
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>
              <strong>{alert.headline || "Alert"}</strong><br />
              {alert.desc || alert.event || "Details not available"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CivicAlerts;
