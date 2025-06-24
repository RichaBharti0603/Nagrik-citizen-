const express = require('express');
const router = express.Router();
const multer = require('multer');
const Issue = require('../models/Issue');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

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

module.exports = router;
