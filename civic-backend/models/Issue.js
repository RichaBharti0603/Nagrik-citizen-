const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  imageUrl: String,
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Issue", issueSchema);
