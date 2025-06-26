// src/pages/CivicProposalForm.jsx
import React, { useState } from "react";
import "./CivicProposalForm.css";

const CivicProposalForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    proposalTitle: "",
    category: "",
    description: "",
    attachments: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your proposal has been submitted! ✅");
    // Actual submission logic can be implemented later
  };

  return (
    <div className="proposal-container">
      <h2>📝 Submit a Civic Proposal</h2>
      <p className="subtext">Contribute your ideas to help improve your community.</p>
      <form className="proposal-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="proposalTitle"
          placeholder="Proposal Title"
          required
          onChange={handleChange}
        />
        <select name="category" onChange={handleChange} required>
          <option value="">Select a Category</option>
          <option value="Environment">🌿 Environment</option>
          <option value="Transport">🚗 Transport</option>
          <option value="Public Health">🏥 Public Health</option>
          <option value="Infrastructure">🏗 Infrastructure</option>
          <option value="Education">🎓 Education</option>
        </select>
        <textarea
          name="description"
          placeholder="Describe your proposal..."
          rows="5"
          required
          onChange={handleChange}
        ></textarea>
        <input
          type="file"
          name="attachments"
          accept=".jpg,.png,.pdf,.docx"
          onChange={handleChange}
        />
        <button type="submit">📤 Submit Proposal</button>
      </form>
    </div>
  );
};

export default CivicProposalForm;
