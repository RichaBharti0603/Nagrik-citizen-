import React from "react";

const schemes = [
  {
    title: "🧹 Swachh Bharat Abhiyan",
    link: "https://swachhbharatmission.gov.in",
  },
  {
    title: "📄 RTI Filing Guide (PDF)",
    link: "https://rti.gov.in/rti-act.pdf",
  },
  {
    title: "🚰 Jal Shakti Mission",
    link: "https://jalshakti-ddws.gov.in",
  },
  {
    title: "🏡 PMAY Housing Scheme",
    link: "https://pmaymis.gov.in",
  },
  {
    title: "🖥️ Digital India Portal",
    link: "https://www.digitalindia.gov.in/",
  },
];

const SchemesResources = () => {
  return (
    <div>
      <h2>📥 Government Schemes & Resources</h2>
      <ul>
        {schemes.map((item, i) => (
          <li key={i}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchemesResources;
