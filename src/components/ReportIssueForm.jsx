import React, { useState } from 'react';
import axios from 'axios';

const ReportIssueForm = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', description);
    formData.append('location', location);
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/issues', formData);
      setMessage('✅ Issue submitted successfully!');
      setDescription('');
      setLocation('');
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to submit issue');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '2rem' }}>
      <h2>🚨 Report a Civic Issue</h2>
      <input
        type="text"
        placeholder="Issue Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      /><br /><br />
      <input
        type="text"
        placeholder="Your Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      /><br /><br />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      /><br /><br />
      <button type="submit">Submit Issue</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ReportIssueForm;
