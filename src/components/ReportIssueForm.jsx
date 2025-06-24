import React, { useState } from "react";
import axios from "axios";
import "./ReportIssueForm.css";

function ReportIssueForm() {
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    image: null,
  });
  const [message, setMessage] = useState("");

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
    <div className="report-issue-container">
      <h2>Report a Civic Issue</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Issue Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Your Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Upload Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Submit Issue</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default ReportIssueForm;
