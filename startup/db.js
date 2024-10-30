const mongoose = require("mongoose");
<<<<<<< HEAD
const logger = require("./logger");
=======
const winston = require("winston");
>>>>>>> parent of 06d8864 (updating the baseURL)

module.exports = function () {
  const db = process.env.MONGODB_URI; // Get the MongoDB URI from environment variables
  if (!db) {
    throw new Error("FATAL ERROR: MONGODB_URI is not defined.");
  }

  console.log("Attempting to connect to MongoDB..."); // Log start of connection attempt
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info(`Connected to MongoDB at ${db}`))
    .catch((err) => {
<<<<<<< HEAD
      logger.error(`Could not connect to MongoDB: ${err.message}`);
      console.log("MongoDB connection error details:", err);
      process.exit(1);
=======
      winston.error(`Could not connect to MongoDB: ${err.message}`);
      process.exit(1); // Exit the process with failure
>>>>>>> parent of 06d8864 (updating the baseURL)
    });
};
