import React, { useState } from "react";
import jsPDF from "jspdf";

const RTIGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    department: "",
    query: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("To,\nThe Public Information Officer,\n" + formData.department, 10, 10);
    doc.text(`Subject: Request for information under RTI Act, 2005\n\n`, 10, 40);
    doc.text(
      `Respected Sir/Madam,\n\nI, ${formData.name}, residing at ${formData.address}, would like to seek the following information under the Right to Information Act, 2005:\n\n${formData.query}\n\nKindly send the requested information to my postal address mentioned above.\n\nThank you.\n\nSincerely,\n${formData.name}`,
      10,
      50
    );
    doc.save("RTI_Request.pdf");
  };

  return (
    <div className="rti-form" style={{ background: "#fffbe6", padding: "1.5rem", borderRadius: "8px", marginBottom: "2rem" }}>
      <h2>📩 File an RTI Request</h2>
      <input type="text" name="name" placeholder="Your Full Name" onChange={handleChange} />
      <input type="text" name="address" placeholder="Your Postal Address" onChange={handleChange} />
      <input type="text" name="department" placeholder="Department (e.g. Municipal Office)" onChange={handleChange} />
      <textarea name="query" placeholder="Your RTI Query..." rows="5" onChange={handleChange} />
      <button onClick={generatePDF} style={{ marginTop: "1rem" }}>Download RTI PDF</button>
    </div>
  );
};

export default RTIGenerator;
