const express = require("express");
const router = express.Router();
const axios = require("axios"); // Use axios for external API requests

// Route to get random quizzes from OpenTDB
router.get("/", async (req, res) => {
  try {
    // Fetch 10 random quizzes from OpenTDB
    const response = await axios.get("https://opentdb.com/api.php?amount=10");
    const quizzes = response.data.results; // Extract quiz data from response

    // Optional: Format quiz data if needed for consistent structure
    const formattedQuizzes = quizzes.map((quiz, index) => ({
      id: index + 1, // Using index as ID for now; can be replaced if OpenTDB provides IDs
      question: quiz.question,
      category: quiz.category,
      difficulty: quiz.difficulty,
      type: quiz.type,
      correct_answer: quiz.correct_answer,
      incorrect_answers: quiz.incorrect_answers,
    }));

    res.json(formattedQuizzes); // Send formatted quizzes to the client
  } catch (error) {
    console.error("Error fetching quizzes from OpenTDB:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
