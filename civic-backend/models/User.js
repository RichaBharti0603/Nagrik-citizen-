const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  issuesReported: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue' }],
  votedPolls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }],
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }]
});

module.exports = mongoose.model('User', userSchema);
