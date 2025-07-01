import React, { useEffect, useState } from "react";
import { leadersData } from "../data/leadersData";
import "./LocalRepresentatives.css";

const LocalRepresentatives = () => {
  const [location, setLocation] = useState(null);
  const [districtInfo, setDistrictInfo] = useState(null);
  const [error, setError] = useState(null);
  const [leaders, setLeaders] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchDistrictInfo(latitude, longitude);
        },
        (err) => {
          setError("Location access denied. Cannot fetch representative info.");
        }
      );
    } else {
      setError("Geolocation not supported.");
    }
  }, []);

  const fetchDistrictInfo = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      const address = data.address;
      setDistrictInfo(address);

      const state = address.state;
      const district = address.county || address.district;

      if (leadersData[state] && leadersData[state][district]) {
        setLeaders(leadersData[state][district]);
      } else {
        setLeaders(null);
      }
    } catch (e) {
      setError("Failed to fetch district info.");
    }
  };

  return (
    <section className="rep-container">
      <h2 className="rep-heading">🗳️ Know Your Local Representatives</h2>

      {error && <p className="rep-error">{error}</p>}

      {districtInfo ? (
        <div className="rep-location">
          <div className="rep-location-box">
            <p><strong>📍 State:</strong> {districtInfo.state}</p>
            <p><strong>🏛️ District:</strong> {districtInfo.county || districtInfo.district}</p>
            <p><strong>🏙️ City:</strong> {districtInfo.city || districtInfo.town || districtInfo.village}</p>
          </div>

          {leaders ? (
            <div className="rep-leader-cards">
              <div className="rep-card">
                <h3>Member of Parliament (MP)</h3>
                <p><strong>Name:</strong> {leaders.mp.name}</p>
                <p><strong>Party:</strong> {leaders.mp.party}</p>
              </div>

              <div className="rep-card">
                <h3>Member of Legislative Assembly (MLA)</h3>
                <p><strong>Name:</strong> {leaders.mla.name}</p>
                <p><strong>Party:</strong> {leaders.mla.party}</p>
              </div>
            </div>
          ) : (
            <div className="rep-not-found">
              <h4>🚫 Representatives Not Found</h4>
              <p>We’re still updating our database for <strong>{districtInfo.county || districtInfo.district}</strong>.</p>
              <p>You can help by submitting info via our contact form.</p>
            </div>
          )}
        </div>
      ) : (
        !error && <p className="rep-loading">Fetching your location...</p>
      )}
    </section>
  );
};

export default LocalRepresentatives;
