import React, { useEffect, useState } from 'react';
import { leadersData } from '../data/leadersData';

const LocalRepresentatives = () => {
  const [location, setLocation] = useState(null);
  const [districtInfo, setDistrictInfo] = useState(null);
  const [error, setError] = useState(null);
  const [leaders, setLeaders] = useState(null);

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
      const address = data.address;
      setDistrictInfo(address);

      // Try matching from our mock data
      const state = address.state;
      const district = address.county || address.district;

      if (leadersData[state] && leadersData[state][district]) {
        setLeaders(leadersData[state][district]);
      } else {
        setLeaders(null);
      }
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

          {leaders ? (
            <div>
              <p><strong>MP:</strong> {leaders.mp.name} ({leaders.mp.party})</p>
              <p><strong>MLA:</strong> {leaders.mla.name} ({leaders.mla.party})</p>
            </div>
          ) : (
            <p><em>We couldn't find your MP/MLA in our database yet.</em></p>
          )}
        </div>
      ) : (
        !error && <p>Fetching your location...</p>
      )}
    </section>
  );
};

export default LocalRepresentatives;
