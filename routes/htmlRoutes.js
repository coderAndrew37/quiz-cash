const express = require("express");
const path = require("path");
const router = express.Router();

// Define and export each route handler separately
const homeRoute = router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html")); // serve the homepage HTML
});

const userAreaRoute = router.get("/userarea", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/userarea.html")); // serve user area HTML
});

const supportRoute = router.get("/support", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/support.html")); // serve support HTML
});

module.exports = { homeRoute, userAreaRoute, supportRoute };
