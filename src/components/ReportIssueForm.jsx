import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReportIssueForm.css";

function ReportIssueForm() {
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    image: null,
  });
  const [message, setMessage] = useState("");

  // 📍 Auto-detect user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            location: `${latitude.toFixed(6)},${longitude.toFixed(6)}`,
          }));
        },
        (error) => {
          console.warn("Location access denied or failed:", error);
        }
      );
    } else {
      console.warn("Geolocation not supported");
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("description", formData.description);
    data.append("location", formData.location);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await axios.post(
        "https://nagrik-citizen.onrender.com/api/issues",
        data
      );
      setMessage("✅ Issue submitted successfully!");
      setFormData({ description: "", location: "", image: null });
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to submit issue");
    }
  };

  return (
  <div className="report-issue-wrapper">
    <div className="report-card">
      <h2 className="form-title">📢 Report a Civic Issue</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="report-form">
        <div className="form-group">
          <label>📝 Issue Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue clearly..."
            required
          />
        </div>

        <div className="form-group">
          <label>📍 Your Location (auto-filled)</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Fetching your location..."
            required
          />
        </div>

        <div className="form-group">
          <label>📸 Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">🚀 Submit Issue</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  </div>
);

}

export default ReportIssueForm;
