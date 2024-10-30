const mongoose = require("mongoose");
const logger = require("./logger");

module.exports = function () {
  const db = process.env.MONGODB_URI;
  if (!db) {
    throw new Error("FATAL ERROR: MONGODB_URI is not defined.");
  }

  console.log("Attempting to connect to MongoDB..."); // Log start of connection attempt
  mongoose
    .connect(db)
    .then(() => logger.info(`Connected to MongoDB at ${db}`))
    .catch((err) => {
      logger.error(`Could not connect to MongoDB: ${err.message}`);
      console.log("MongoDB connection error details:", err);
      process.exit(1);
    });
};
