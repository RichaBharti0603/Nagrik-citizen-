const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const multer = require('multer');
const path = require('path');


// Image Upload Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST /api/issues
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, category, location, priority, submittedBy } = req.body;

    const issue = new Issue({
      title,
      description,
      category,
      location,
      priority,
      submittedBy,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });

    await issue.save();
    res.status(201).json({ message: "Issue reported", issue });
  } catch (error) {
    res.status(500).json({ error: "Failed to report issue" });
  }
});

// GET /api/issues
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch issues" });
  }
});

module.exports = router;
