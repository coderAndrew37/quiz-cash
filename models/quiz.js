// models/quiz.js

const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose schema for Quiz
const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  category: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: { type: String, required: true },
      options: {
        type: [String],
        required: true,
        validate: (v) => Array.isArray(v) && v.length > 1,
      },
      answer: { type: String, required: true },
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Model
const Quiz = mongoose.model("Quiz", quizSchema);

// Joi validation for quiz input
function validateQuiz(quiz) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    category: Joi.string().required(),
    questions: Joi.array()
      .items(
        Joi.object({
          question: Joi.string().required(),
          options: Joi.array().items(Joi.string()).min(2).required(),
          answer: Joi.string().required(),
        })
      )
      .required(),
  });
  return schema.validate(quiz);
}

module.exports = { Quiz, validateQuiz };
