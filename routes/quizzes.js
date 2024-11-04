const express = require("express");
const router = express.Router();
const Question = require("../models/question.js");
const authMiddleware = require("../middleware/auth");
const User = require("../models/users.js");

// Protected route for completing a quiz
router.post("/complete-quiz", authMiddleware, async (req, res) => {
  try {
    const coinsEarned = req.body.coinsEarned;
    const userId = req.user.userId;

    // Assuming User model has a method to add coins
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.coins += coinsEarned;
    await user.save();

    res.status(200).json({ message: "Quiz completed", coins: user.coins });
  } catch (error) {
    console.error("Error completing quiz:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Public route for getting random quiz questions
router.get("/public", async (req, res) => {
  const { topic } = req.query;

  try {
    let questions;

    if (topic) {
      // Filter by topic and sample 10 random questions
      questions = await Question.aggregate([
        { $match: { topic: new RegExp(`^${topic}$`, "i") } },
        { $sample: { size: 10 } },
      ]);
    } else {
      // Sample 10 random questions across all topics
      questions = await Question.aggregate([{ $sample: { size: 10 } }]);
    }

    console.log("Questions retrieved:", questions);
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("Server error");
  }
});

// Protected route for starting a quiz
router.post("/start", authMiddleware, (req, res) => {
  res.send("Authorized to start quiz");
});

module.exports = router;
