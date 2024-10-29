const express = require("express");
const router = express.Router();
const Question = require("../models/question.js");
const auth = require("../middleware/auth");

// Public route for getting quiz questions
router.get("/public", async (req, res) => {
  const { topic } = req.query;
  console.log("Fetching quizzes with topic:", topic); // Debug statement

  try {
    let questions;
    if (topic) {
      questions = await Question.aggregate([
        { $match: { topic: { $regex: new RegExp(`^${topic}$`, "i") } } },
        { $sample: { size: 10 } },
      ]);
    } else {
      questions = await Question.aggregate([{ $sample: { size: 10 } }]);
    }

    console.log("Questions retrieved:", questions); // Debug log
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Server error");
  }
});

// Protected route for starting a quiz
router.post("/start", auth, (req, res) => {
  res.send("Authorized to start quiz");
});

module.exports = router;
