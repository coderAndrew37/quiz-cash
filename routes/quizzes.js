// routes/quizzes.js

const express = require("express");
const { Quiz, validateQuiz } = require("../models/quiz");
const router = express.Router();

router.post("/", async (req, res) => {
  // Validate quiz input with Joi
  const { error } = validateQuiz(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Create and save quiz
  const quiz = new Quiz({
    title: req.body.title,
    category: req.body.category,
    questions: req.body.questions,
  });
  await quiz.save();

  res.send(quiz);
});

module.exports = router;
