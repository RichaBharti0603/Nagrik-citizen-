import React, { useEffect, useState } from "react";

const AirQuality = () => {
  const [aqi, setAqi] = useState(null);

  useEffect(() => {
    const lat = 28.6139;
    const lon = 77.2090;

    fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_AIR_QUALITY_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const aqiLevel = data.list[0].main.aqi;
        setAqi(aqiLevel);
      })
      .catch((err) => console.error("Air Quality API error:", err));
  }, []);

  const getAqiStatus = (aqi) => {
    switch (aqi) {
      case 1: return "Good 😊";
      case 2: return "Fair 🙂";
      case 3: return "Moderate 😐";
      case 4: return "Poor 😷";
      case 5: return "Very Poor 🤢";
      default: return "Loading...";
    }
  };

  return (
    <div>
      <h2>🌫️ Air Quality in Delhi</h2>
      <p>AQI: {aqi ? getAqiStatus(aqi) : "Loading..."}</p>
    </div>
  );
};

export default AirQuality;
