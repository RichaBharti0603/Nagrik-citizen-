const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const Issue = require("./models/Issue");
const Poll = require("./models/Poll");
const feedbackRoutes = require("./routes/feedback");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/feedback", feedbackRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB error:', err));

app.use('/api/issues', require('./routes/issues'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Update issue status
app.put("/api/issues/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// Create a poll
app.post("/api/polls", async (req, res) => {
  const { question, options } = req.body;
  const votes = {};
  options.forEach(option => votes[option] = 0);
  const newPoll = new Poll({ question, options, votes });
  await newPoll.save();
  res.json(newPoll);
});

// Get all polls
app.get("/api/polls", async (req, res) => {
  const polls = await Poll.find();
  res.json(polls);
});

// Vote on a poll
app.post("/api/polls/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { option } = req.body;
  const poll = await Poll.findById(id);
  if (!poll.votes.has(option)) return res.status(400).json({ error: "Invalid option" });
  poll.votes.set(option, poll.votes.get(option) + 1);
  await poll.save();
  res.json(poll);
});


