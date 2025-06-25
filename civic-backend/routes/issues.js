const express = require('express');
const router = express.Router();
const multer = require('multer');
const Issue = require('../models/Issue');

// Image Upload Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST: Submit new issue
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { description, location } = req.body;
    const image = req.file?.filename;

    const newIssue = new Issue({ description, location, image });
    await newIssue.save();
    res.status(201).json({ message: 'Issue reported successfully', issue: newIssue });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/user/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const issues = await Issue.find({ email }); // assuming issue schema has 'email' field
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user issues' });
  }
});


// GET: Fetch all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
