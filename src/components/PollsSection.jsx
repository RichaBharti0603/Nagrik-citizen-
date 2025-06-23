import React, { useState } from 'react';

const samplePoll = {
  question: "Should the central park in your area be renovated?",
  options: ["Yes", "No", "Not Sure"]
};

const PollsSection = () => {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      setSubmitted(true);
      console.log("User voted:", selected);
      // Later: send this to backend or store in database
    }
  };

  return (
    <section id="polls" style={{ margin: '2rem', padding: '1rem', backgroundColor: '#f5f5f5' }}>
      <h2>📊 Public Poll</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <p>{samplePoll.question}</p>
          {samplePoll.options.map((option, index) => (
            <label key={index} style={{ display: 'block', marginBottom: '0.5rem' }}>
              <input
                type="radio"
                name="poll"
                value={option}
                checked={selected === option}
                onChange={handleChange}
              />{" "}
              {option}
            </label>
          ))}
          <button type="submit" style={{ padding: '0.5rem', backgroundColor: '#0b3954', color: 'white', border: 'none' }}>
            Submit Vote
          </button>
        </form>
      ) : (
        <p>✅ Thank you for voting: <strong>{selected}</strong></p>
      )}
    </section>
  );
};

export default PollsSection;
