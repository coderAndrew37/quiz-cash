require("dotenv").config();
require("./startup/db.js")();
const express = require("express");
const path = require("path");
const logger = require("./startup/logger"); // Import the logger
const errorHandler = require("./startup/errorHandler.js"); // Import custom error handler
const cors = require("cors");

const {
  homeRoute,
  userAreaRoute,
  supportRoute,
} = require("./routes/htmlRoutes.js");

const app = express();
app.use(express.json()); // Add this middleware to parse JSON

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : "*"; // Default to '*' for all origins if not set

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        allowedOrigins === "*" ||
        allowedOrigins.includes(origin) ||
        !origin
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Serve static files like CSS and JS
app.use(express.static(path.join(__dirname, "public")));

// Routes for HTML files
app.use("/", homeRoute);
app.use("/", userAreaRoute);
app.use("/", supportRoute);

// Initialize all API routes
require("./startup/routes.js")(app);

// Custom error handler for all other errors
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
