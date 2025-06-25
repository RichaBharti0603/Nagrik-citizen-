const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Issue = require('../models/Issue');
const Feedback = require('../models/Feedback');
const Poll = require('../models/Poll');

router.get('/:userId/dashboard', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId)
      .populate('issuesReported')
      .populate('votedPolls')
      .populate('feedback');

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      name: user.name,
      email: user.email,
      issuesReported: user.issuesReported,
      votedPolls: user.votedPolls,
      feedback: user.feedback
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
