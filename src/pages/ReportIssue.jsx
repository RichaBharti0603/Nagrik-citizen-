import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReportIssue.css";
import SubmittedIssues from "../components/SubmittedIssues";

function ReportIssue() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Road",
    location: "",
    priority: "Low",
    submittedBy: "",
    date: new Date().toISOString().slice(0, 16),
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // 🌐 Geolocation + Reverse Geocode
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await res.json();
        const city = data.address.city || data.address.town || data.address.village || "";
        const state = data.address.state || "";
        const road = data.address.road || "";
        const suburb = data.address.suburb || "";
        const displayLocation = `${road || suburb || ""}, ${city}, ${state}`;

        setFormData((prev) => ({
          ...prev,
          location: displayLocation,
        }));
        setSelectedState(state);
        setSelectedCity(city);
      } catch (error) {
        console.error("Location fetch failed:", error);
        setFormData((prev) => ({
          ...prev,
          location: `${latitude.toFixed(6)},${longitude.toFixed(6)}`
        }));
      }
    });
  }, []);

  // 📥 Load States & Cities
  useEffect(() => {
    fetch("/states+cities.json")
      .then((res) => res.json())
      .then((data) => {
        const indiaStates = data.filter((state) => state.country_id === 101);
        setStates(indiaStates);
      });
  }, []);

  const handleStateChange = (e) => {
    const selected = e.target.value;
    setSelectedState(selected);
    const found = states.find((s) => s.name === selected);
    if (found?.cities) {
      setCities([{ name: "Near You" }, ...found.cities]);
    } else {
      setCities([{ name: "Near You" }]);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    data.append("state", selectedState);
    data.append("city", selectedCity);
    if (image) data.append("image", image);

    try {
      await axios.post("https://nagrik-citizen.onrender.com/api/issues", data);
      alert("✅ Issue submitted!");
      setFormData({
        title: "",
        description: "",
        category: "Road",
        location: "",
        priority: "Low",
        submittedBy: "",
        date: new Date().toISOString().slice(0, 16),
      });
      setSelectedState("");
      setSelectedCity("");
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ Submission failed");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="report-form-container">
        <h2>📌 Report a Civic Issue</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-grid">
          <div className="form-group">
            <label>Title</label>
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" placeholder="Describe the issue..." value={formData.description} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Road">🛣️ Road</option>
                <option value="Water">🚰 Water</option>
                <option value="Electricity">💡 Electricity</option>
                <option value="Garbage">🗑️ Garbage</option>
                <option value="Other">❓ Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>State</label>
              <select value={selectedState} onChange={handleStateChange} required>
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>City</label>
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required>
                <option value="">Select City</option>
                {cities.map((c, idx) => (
                  <option key={idx} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>📍 Location (auto-filled)</label>
            <input name="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>👤 Your Email / Name</label>
            <input name="submittedBy" value={formData.submittedBy} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>🖼️ Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImage} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
          </div>

          <div className="form-group">
            <label>📅 Submission Date</label>
            <input type="datetime-local" name="date" value={formData.date} readOnly />
          </div>

          <div className="form-submit">
            <button type="submit">📤 Submit Issue</button>
          </div>
        </form>
      </div>

      {/* 📈 Dashboard Widget */}
      <div className="dashboard-widget">
        <h3>📊 Issue Stats</h3>
        <p>Total Issues: 120</p>
        <p>Resolved: 86</p>
        <p>Pending: 34</p>
      </div>

      {/* 📋 Submitted Issues List */}
      <div className="submitted-issues-wrapper">
        <SubmittedIssues />
      </div>
    </div>
  );
}

export default ReportIssue;
