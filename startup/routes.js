const express = require("express");
const quizzes = require("../routes/quizzes");

module.exports = function (app) {
  app.use("/api/quizzes", quizzes);
};
