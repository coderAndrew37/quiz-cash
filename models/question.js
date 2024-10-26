// models/Question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  question: { type: String, required: true },
  correct_answer: { type: String, required: true },
  incorrect_answers: [{ type: String }],
});

module.exports = mongoose.model("Question", questionSchema);
