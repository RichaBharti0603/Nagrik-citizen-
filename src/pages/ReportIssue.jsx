import React, { useState } from "react";
import axios from "axios";
import "./ReportIssue.css";

function ReportIssue() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Road",
    location: "",
    priority: "Low",
    submittedBy: ""
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) data.append(key, formData[key]);
    if (image) data.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/issues", data);
      alert("✅ Issue submitted!");
      setFormData({ title: "", description: "", category: "Road", location: "", priority: "Low", submittedBy: "" });
      setImage(null);
    } catch (error) {
      alert("❌ Submission failed");
    }
  };

  return (
    <div className="report-form-container">
      <h2>📌 Report a Civic Issue</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Describe the issue..." value={formData.description} onChange={handleChange} required />
        
        <select name="category" value={formData.category} onChange={handleChange}>
          <option>Road</option>
          <option>Water</option>
          <option>Electricity</option>
          <option>Garbage</option>
          <option>Other</option>
        </select>

        <input name="location" placeholder="Location (e.g., Area, Landmark)" value={formData.location} onChange={handleChange} required />

        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input name="submittedBy" placeholder="Your Email / Name" value={formData.submittedBy} onChange={handleChange} required />

        <label>Upload Image (optional)</label>
        <input type="file" accept="image/*" onChange={handleImage} />

        <button type="submit">📤 Submit Issue</button>
      </form>
    </div>
  );
}

export default ReportIssue;
