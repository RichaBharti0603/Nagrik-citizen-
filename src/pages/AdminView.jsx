import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [surveys, setSurveys] = useState([]);
  const [issues, setIssues] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSurvey, setNewSurvey] = useState({ title: "", url: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [surveyRes, issueRes, feedbackRes] = await Promise.all([
          axios.get("/api/publicinput/surveys"),
          axios.get("/api/issues"),
          axios.get("/api/feedback"),
        ]);

        setSurveys(surveyRes.data.surveys || []);
        setIssues(issueRes.data || []);
        setFeedback(feedbackRes.data || []);
      } catch (err) {
        console.error("Error loading admin data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const markResolved = async (id) => {
    try {
      await axios.put(`/api/issues/${id}/resolve`);
      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === id ? { ...issue, status: "resolved" } : issue
        )
      );
    } catch (err) {
      console.error("Error marking issue as resolved", err);
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`/api/feedback/${id}`);
      setFeedback((prev) => prev.filter((fb) => fb._id !== id));
    } catch (err) {
      console.error("Error deleting feedback", err);
    }
  };

  const handleAddSurvey = async () => {
    if (!newSurvey.title || !newSurvey.url) return alert("All fields required");
    try {
      const res = await axios.post("/api/publicinput/surveys", newSurvey);
      setSurveys((prev) => [res.data, ...prev]);
      setNewSurvey({ title: "", url: "" });
    } catch (err) {
      console.error("Error adding survey", err);
    }
  };

  if (loading) return <p>Loading Admin Panel...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🛠️ Admin Panel</h1>

      {/* New Survey Form */}
      <section style={styles.section}>
        <h2>Add New Survey</h2>
        <input
          type="text"
          placeholder="Survey Title"
          value={newSurvey.title}
          onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Survey URL"
          value={newSurvey.url}
          onChange={(e) => setNewSurvey({ ...newSurvey, url: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAddSurvey} style={styles.button}>Add Survey</button>
      </section>

      {/* Surveys */}
      <section style={styles.section}>
        <h2>📋 PublicInput Surveys</h2>
        {surveys.length === 0 ? (
          <p>No surveys found.</p>
        ) : (
          <ul style={styles.list}>
            {surveys.map((survey) => (
              <li key={survey.id} style={styles.listItem}>
                <a href={survey.url} target="_blank" rel="noreferrer">
                  {survey.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Issues */}
      <section style={styles.section}>
        <h2>📝 Reported Issues</h2>
        {issues.length === 0 ? (
          <p>No issues reported.</p>
        ) : (
          <ul style={styles.list}>
            {issues.map((issue) => (
              <li key={issue._id} style={styles.listItem}>
                <strong>{issue.category}</strong>: {issue.description}
                <br />
                <em>Status: {issue.status}</em>
                {issue.status !== "resolved" && (
                  <button
                    onClick={() => markResolved(issue._id)}
                    style={styles.smallButton}
                  >
                    Mark Resolved
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Feedback */}
      <section style={styles.section}>
        <h2>💬 Feedback</h2>
        {feedback.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          <ul style={styles.list}>
            {feedback.map((fb) => (
              <li key={fb._id} style={styles.listItem}>
                <strong>{fb.name}</strong>: {fb.message}
                <br />
                <small>{new Date(fb.date).toLocaleString()}</small>
                <br />
                <button
                  onClick={() => deleteFeedback(fb._id)}
                  style={styles.smallButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  section: {
    background: "#fff",
    padding: "1rem",
    marginBottom: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "0.5rem",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
    width: "calc(50% - 1rem)",
  },
  button: {
    padding: "0.6rem 1rem",
    backgroundColor: "#0077cc",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  smallButton: {
    padding: "0.3rem 0.6rem",
    marginTop: "0.5rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    marginBottom: "1rem",
    backgroundColor: "#f1f1f1",
    padding: "1rem",
    borderRadius: "6px",
  },
};

export default AdminPanel;
