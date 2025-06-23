import React, { useState } from 'react';
import './ReportIssueForm.css';

const ReportIssueForm = () => {
  const [formData, setFormData] = useState({ description: '', location: '', image: null });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = e => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Issue submitted:', formData);
    // Next: Connect to backend
  };

  return (
    <section id="report" className="report-form">
      <h2>Report a Civic Issue</h2>
      <form onSubmit={handleSubmit}>
        <textarea name="description" placeholder="Describe the issue..." onChange={handleChange} required />
        <input name="location" placeholder="Location or landmark" onChange={handleChange} required />
        <input type="file" onChange={handleImageUpload} accept="image/*" />
        <button type="submit">Submit Issue</button>
      </form>
    </section>
  );
};

export default ReportIssueForm;
