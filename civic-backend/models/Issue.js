const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  location: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved'], default: 'Open' },
  submittedBy: { type: String }, // email or name
});

module.exports = mongoose.model("Issue", issueSchema);
