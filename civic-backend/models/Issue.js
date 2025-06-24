const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  description: String,
  location: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Issue', issueSchema);
