import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

// Fix Leaflet icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapView() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get(
          "https://nagrik-citizen.onrender.com/api/issues"
        );
        setIssues(res.data);
      } catch (err) {
        console.error("Error fetching issues:", err);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="map-container">
      <h2>🗺️ Civic Issue Map</h2>
      <MapContainer
        center={[28.6139, 77.2090]} // Default: Delhi
        zoom={5}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {issues.map((issue, index) => {
          const location = issue.location.split(","); // Format: "28.61,77.20"
          const lat = parseFloat(location[0]);
          const lng = parseFloat(location[1]);

          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <Marker key={index} position={[lat, lng]}>
              <Popup>
                <strong>{issue.description}</strong>
                <br />
                <em>{issue.location}</em>
                <br />
                {issue.image && (
                  <img
                    src={`https://nagrik-citizen.onrender.com/uploads/${issue.image}`}
                    alt="issue"
                    width="100"
                  />
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapView;
