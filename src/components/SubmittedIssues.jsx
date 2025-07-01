import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SubmittedIssues.css";

const SubmittedIssues = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const issuesPerPage = 6;

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get("https://nagrik-citizen.onrender.com/api/issues");
        setIssues(res.data);
        setFilteredIssues(res.data);
      } catch (err) {
        console.error("Failed to fetch issues", err);
      }
    };

    const fetchStates = async () => {
      try {
        const res = await fetch("/states+cities.json");
        const data = await res.json();
        const indiaStates = data.filter((s) => s.country_id === 101);
        setStates(indiaStates);
      } catch (error) {
        console.error("Failed to load states and cities", error);
      }
    };

    fetchIssues();
    fetchStates();
  }, []);

  useEffect(() => {
    let data = [...issues];

    if (selectedState && selectedCity) {
      if (selectedCity === "Near You") {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            const nearby = issues.filter((issue) => {
              if (!issue.location.includes(",")) return false;
              const [lat, lon] = issue.location.split(",").map(parseFloat);
              if (!isNaN(lat) && !isNaN(lon)) {
                const dist = Math.sqrt((lat - latitude) ** 2 + (lon - longitude) ** 2);
                return dist < 0.5;
              }
              return false;
            });
            setFilteredIssues(nearby);
            setCurrentPage(1);
          },
          () => alert("Location access needed for 'Near You'")
        );
      } else {
        data = issues.filter((issue) => {
          const loc = issue.location?.toLowerCase() || "";
          return loc.includes(selectedState.toLowerCase()) && loc.includes(selectedCity.toLowerCase());
        });
        setFilteredIssues(data);
        setCurrentPage(1);
      }
    } else if (selectedState) {
      data = issues.filter((issue) =>
        (issue.location?.toLowerCase() || "").includes(selectedState.toLowerCase())
      );
      setFilteredIssues(data);
      setCurrentPage(1);
    } else {
      setFilteredIssues(issues);
    }
  }, [selectedState, selectedCity, issues]);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");
    const found = states.find((s) => s.name === state);
    if (found?.cities) {
      setCities([{ name: "Near You" }, ...found.cities]);
    } else {
      setCities([{ name: "Near You" }]);
    }
  };

  const indexOfLast = currentPage * issuesPerPage;
  const indexOfFirst = indexOfLast - issuesPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredIssues.length / issuesPerPage);

  return (
    <div className="page-wrapper">
    <div className="submitted-issues-container">
      <h3>📋 Submitted Civic Issues</h3>

      <div className="filter-section">
        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <select value={selectedState} onChange={handleStateChange}>
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>City</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="">Select City</option>
              {cities.map((c, idx) => (
                <option key={idx} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="issue-cards-grid">
        {currentIssues.map((issue, index) => (
          <div className="issue-card" key={index}>
            <img src={issue.imageUrl} alt="Issue" className="issue-image" />
            <div className="issue-details">
              <h4>{issue.description}</h4>
              <p><strong>📍 Location:</strong> {issue.location}</p>
              <p><strong>🕒 Date:</strong> {new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SubmittedIssues;
