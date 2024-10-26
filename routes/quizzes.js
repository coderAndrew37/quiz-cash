// routes/quizzes.js
const express = require("express");
const router = express.Router();
const Question = require("../models/question.js");

router.get("/", async (req, res) => {
  const { topic } = req.query;

  try {
    let questions;
    if (topic) {
      console.log("Received topic:", topic); // Log topic to verify
      questions = await Question.aggregate([
        { $match: { topic: { $regex: new RegExp(`^${topic}$`, "i") } } },
        { $sample: { size: 10 } },
      ]);
    } else {
      console.log("No topic provided, returning general questions.");
      questions = await Question.aggregate([{ $sample: { size: 10 } }]);
    }

    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
