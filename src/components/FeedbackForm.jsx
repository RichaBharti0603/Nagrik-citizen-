import React, { useState } from "react";
import "./FeedbackForm.css";

function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    category: "Suggestion",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://nagrik-citizen.onrender.com/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "", category: "Suggestion" });
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>📝 Share Your Feedback</h2>
      {submitted && <p className="success-msg">✅ Thanks for your feedback!</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name (optional)"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <select name="category" value={form.category} onChange={handleChange}>
          <option>Suggestion</option>
          <option>Complaint</option>
          <option>Compliment</option>
        </select>
        <textarea
          name="message"
          placeholder="Write your message..."
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
