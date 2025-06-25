// src/pages/PublicSchemes.jsx
import React, { useState } from "react";
import "./PublicSchemes.css";

const schemesData = [
  {
    title: "PM Awas Yojana",
    category: "Housing",
    description: "Affordable housing scheme for urban & rural poor.",
    for: "Economically Weaker Section",
  },
  {
    title: "Startup India",
    category: "Entrepreneurship",
    description: "Support for early-stage startups including funding & mentorship.",
    for: "Entrepreneurs & Innovators",
  },
  {
    title: "Kanya Sumangala Yojana",
    category: "Women",
    description: "Financial aid to support girl child education.",
    for: "Girls & Women",
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana",
    category: "Farmers",
    description: "Crop insurance scheme for Indian farmers.",
    for: "Farmers",
  },
  {
    title: "National Apprenticeship Training Scheme",
    category: "Students",
    description: "Skill development program for engineering & diploma holders.",
    for: "Students",
  },
];

function PublicSchemes() {
  const [search, setSearch] = useState("");

  const filteredSchemes = schemesData.filter(
    (scheme) =>
      scheme.title.toLowerCase().includes(search.toLowerCase()) ||
      scheme.category.toLowerCase().includes(search.toLowerCase()) ||
      scheme.for.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="schemes-page">
      <h1>📢 Public Schemes Awareness</h1>
      <p>Explore government schemes tailored for different communities and needs.</p>

      <input
        type="text"
        placeholder="🔍 Search by category, beneficiary..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="schemes-grid">
        {filteredSchemes.map((scheme, idx) => (
          <div className="scheme-card" key={idx}>
            <h3>{scheme.title}</h3>
            <p><strong>Category:</strong> {scheme.category}</p>
            <p><strong>For:</strong> {scheme.for}</p>
            <p>{scheme.description}</p>
          </div>
        ))}
        {filteredSchemes.length === 0 && <p>No schemes found for your search.</p>}
      </div>
    </div>
  );
}

export default PublicSchemes;
