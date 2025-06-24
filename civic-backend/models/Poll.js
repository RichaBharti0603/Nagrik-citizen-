const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  question: String,
  options: [String],
  votes: {
    type: Map,
    of: Number,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Poll", pollSchema);
