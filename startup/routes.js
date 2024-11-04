const express = require("express");
const quizzes = require("../routes/quizzes");
const auth = require("../routes/auth");
const users = require("../routes/passwordReset");

module.exports = function (app) {
  // Route for quiz-related actions
  app.use("/api/quizzes", quizzes);

  //Route for user-related actions (register, login)
  app.use("/api/users", auth);

  // Route for password reset actions
  app.use("/api/password-reset", users);
};
