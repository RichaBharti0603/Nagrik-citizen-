import React, { useEffect, useState } from "react";
import axios from "axios";

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submittedPolls, setSubmittedPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await axios.get("/api/polls");
        setPolls(res.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  const handleOptionChange = (pollId, optionId) => {
    setSelectedOptions((prev) => ({ ...prev, [pollId]: optionId }));
  };

  const handleSubmit = async (pollId) => {
    if (!selectedOptions[pollId]) {
      alert("Please select an option before submitting.");
      return;
    }

    try {
      const res = await axios.post(`/api/polls/${pollId}/vote`, {
        optionId: selectedOptions[pollId],
      });
      const updatedPolls = polls.map((poll) =>
        poll._id === pollId ? res.data.updatedPoll : poll
      );
      setPolls(updatedPolls);
      setSubmittedPolls((prev) => [...prev, pollId]);
      alert("✅ Vote submitted successfully!");
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("❌ Failed to submit vote. Try again later.");
    }
  };

  const getTotalVotes = (options) =>
    options.reduce((acc, curr) => acc + curr.votes, 0);

  if (loading) return <p style={styles.loading}>⏳ Loading polls...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📢 Public Opinion Polls</h1>

      {polls.length === 0 ? (
        <p>No polls available right now. Please check back later.</p>
      ) : (
        polls.map((poll) => {
          const isSubmitted = submittedPolls.includes(poll._id);
          const totalVotes = getTotalVotes(poll.options);

          return (
            <div key={poll._id} style={styles.pollCard}>
              <h2 style={styles.question}>{poll.question}</h2>

              <form>
                {poll.options.map((option) => {
                  const percent =
                    totalVotes > 0
                      ? ((option.votes / totalVotes) * 100).toFixed(1)
                      : 0;
                  return (
                    <div key={option._id} style={styles.optionWrapper}>
                      <label style={styles.optionLabel}>
                        <input
                          type="radio"
                          name={`poll-${poll._id}`}
                          value={option._id}
                          onChange={() =>
                            handleOptionChange(poll._id, option._id)
                          }
                          disabled={isSubmitted}
                          checked={
                            selectedOptions[poll._id] === option._id
                          }
                        />
                        {option.text}
                      </label>

                      {isSubmitted && (
                        <div style={styles.resultBarContainer}>
                          <div
                            style={{
                              ...styles.resultBar,
                              width: `${percent}%`,
                            }}
                          ></div>
                          <span style={styles.resultPercent}>
                            {percent}% ({option.votes} votes)
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </form>

              {!isSubmitted ? (
                <button
                  style={styles.button}
                  onClick={() => handleSubmit(poll._id)}
                >
                  Submit Vote
                </button>
              ) : (
                <p style={styles.thanks}>🟢 Your response has been recorded.</p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#0a3d62",
    marginBottom: "2rem",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    paddingTop: "2rem",
  },
  pollCard: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    marginBottom: "2rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "all 0.3s",
  },
  question: {
    fontSize: "1.3rem",
    marginBottom: "1rem",
  },
  optionWrapper: {
    marginBottom: "1rem",
  },
  optionLabel: {
    display: "block",
    fontSize: "1rem",
    marginBottom: "0.3rem",
    cursor: "pointer",
  },
  resultBarContainer: {
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    position: "relative",
    height: "20px",
    marginBottom: "0.5rem",
  },
  resultBar: {
    backgroundColor: "#3498db",
    height: "100%",
    borderRadius: "5px 0 0 5px",
    transition: "width 0.5s ease-in-out",
  },
  resultPercent: {
    fontSize: "0.85rem",
    color: "#333",
    paddingLeft: "0.5rem",
  },
  button: {
    padding: "0.6rem 1.2rem",
    backgroundColor: "#2980b9",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  thanks: {
    color: "green",
    marginTop: "1rem",
    fontWeight: "bold",
  },
};

export default Polls;
