const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  message: { type: String, required: true },
  category: { type: String, enum: ["Suggestion", "Complaint", "Compliment"] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
