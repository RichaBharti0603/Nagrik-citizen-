import React from "react";

const emergencyContacts = [
  { name: "Police", number: "100" },
  { name: "Ambulance", number: "102" },
  { name: "Fire", number: "101" },
  { name: "Women Helpline", number: "1091" },
  { name: "Child Helpline", number: "1098" },
  { name: "Disaster Management", number: "108" },
];

const EmergencyDirectory = () => {
  return (
    <div>
      <h2>📞 Emergency Contacts</h2>
      <ul>
        {emergencyContacts.map((contact, i) => (
          <li key={i}>
            <strong>{contact.name}</strong>:{" "}
            <a href={`tel:${contact.number}`}>{contact.number}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmergencyDirectory;
