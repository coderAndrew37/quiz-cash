const express = require("express");
const quizzes = require("../routes/quizzes");
const users = require("../routes/users"); // Import the users route

module.exports = function (app) {
  // Route for quiz-related actions
  app.use("/api/quizzes", quizzes);

  // Route for user-related actions (register, login)
  app.use("/api/users", users);
};
