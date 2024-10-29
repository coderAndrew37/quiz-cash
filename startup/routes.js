const express = require("express");
const quizzes = require("../routes/quizzes");

module.exports = function (app) {
  // Public route for viewing quizzes
  app.use("/api/quizzes", quizzes);

  // Protected route for starting quizzes
  app.use("/api/quizzes", quizzes);
};
