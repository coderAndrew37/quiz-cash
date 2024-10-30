require("dotenv").config();
require("./startup/db.js")();
const express = require("express");
const path = require("path");
const logger = require("./startup/logger"); // Import the logger

const {
  homeRoute,
  userAreaRoute,
  supportRoute,
} = require("./routes/htmlRoutes.js");

const app = express();
app.use(express.json()); // Add this middleware to parse JSON

app.use(express.static("public")); // Serve static files like CSS and JS

// Routes for HTML files
app.use("/", homeRoute);
app.use("/", userAreaRoute);
app.use("/", supportRoute);

// Initialize all API routes
require("./startup/routes.js")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

app.use((err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).send("Internal Server Error");
});
