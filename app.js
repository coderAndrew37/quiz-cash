require("dotenv").config(); // Load environment variables
require("./startup/db.js")();
const express = require("express");
const path = require("path");
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
