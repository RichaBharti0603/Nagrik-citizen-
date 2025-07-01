const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();
const app = express();
const PORT = 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

// ✅ Test route to check server
app.get("/", (req, res) => {
  res.send("✅ Test server running");
});

// ✅ Debug route to list users
app.get("/api/debug/users", async (req, res) => {
  try {
    const users = await User.find({}, { email: 1, role: 1, password: 1 });
    res.json(users);
  } catch (error) {
    console.error("DEBUG ERROR:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Test server running at http://localhost:${PORT}`);
});
