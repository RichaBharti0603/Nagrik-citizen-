const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fetch = require("node-fetch");
const Issue = require("./models/Issue");
const Poll = require("./models/Poll");
const User = require("./models/User");
const feedbackRoutes = require("./routes/feedback");
const newsRoutes = require('./routes/news');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/user');
const publicInputRoutes = require("./routes/publicinput");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://nagrik-citizen.vercel.app'],
  credentials: true,
};

app.use(cors(corsOptions));



app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/feedback", feedbackRoutes);
app.use('/api/news', newsRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);
app.use("/api/publicinput", publicInputRoutes);
app.use('/api/issues', require('./routes/issues'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ DB error:', err));

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// ─────────────────────────────────────────────────────────────
app.put("/api/issues/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// ─────────────────────────────────────────────────────────────
app.post("/api/polls", async (req, res) => {
  const { question, options } = req.body;
  const votes = {};
  options.forEach(option => votes[option] = 0);
  const newPoll = new Poll({ question, options, votes });
  await newPoll.save();
  res.json(newPoll);
});

app.get("/api/polls", async (req, res) => {
  const polls = await Poll.find();
  res.json(polls);
});

app.post("/api/polls/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { option } = req.body;
  const poll = await Poll.findById(id);
  if (!poll.votes.has(option)) return res.status(400).json({ error: "Invalid option" });
  poll.votes.set(option, poll.votes.get(option) + 1);
  await poll.save();
  res.json(poll);
});

// ─────────────────────────────────────────────────────────────
app.get("/api/alerts", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/alerts.json?key=${process.env.WEATHER_API_KEY}&q=India`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Alert fetch error:", error);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

// ─────────────────────────────────────────────────────────────
app.get("/api/debug/users", async (req, res) => {
  try {
    const users = await User.find({}, { email: 1, role: 1 });
    res.json(users);
  } catch (error) {
    console.error("DEBUG USERS ERROR:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ✅ Default test route
app.get("/", (req, res) => {
  res.send("✅ Nagrik Civic Backend Running");
});
