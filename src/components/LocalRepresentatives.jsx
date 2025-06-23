import React, { useEffect, useState } from 'react';

const LocalRepresentatives = () => {
  const [location, setLocation] = useState(null);
  const [districtInfo, setDistrictInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchDistrictInfo(latitude, longitude);
        },
        (err) => {
          setError('Location access denied. Cannot fetch representative info.');
        }
      );
    } else {
      setError('Geolocation not supported.');
    }
  }, []);

  const fetchDistrictInfo = async (lat, lon) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      setDistrictInfo(data.address);
    } catch (e) {
      setError('Failed to fetch district info.');
    }
  };

  return (
    <section id="representatives" style={{ margin: '2rem', padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <h2>🗳️ Know Your Local Representatives</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {districtInfo ? (
        <div>
          <p><strong>State:</strong> {districtInfo.state}</p>
          <p><strong>District:</strong> {districtInfo.county || districtInfo.district}</p>
          <p><strong>City:</strong> {districtInfo.city || districtInfo.town || districtInfo.village}</p>

          {/* TODO: Map this info to your own MP/MLA data later */}
          <p><em>[Example Placeholder]</em></p>
          <ul>
            <li><strong>MP:</strong> Placeholder for MP of {districtInfo.state}</li>
            <li><strong>MLA:</strong> Placeholder for MLA of {districtInfo.county || districtInfo.district}</li>
          </ul>
        </div>
      ) : (
        !error && <p>Fetching your location...</p>
      )}
    </section>
  );
};

export default LocalRepresentatives;
