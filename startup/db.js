// db.js
const mongoose = require("mongoose");
const logger = require("./logger"); // Use custom logger instead of winston directly

module.exports = function () {
  const db = process.env.MONGODB_URI;
  if (!db) {
    throw new Error("FATAL ERROR: MONGODB_URI is not defined.");
  }

  mongoose
    .connect(db)
    .then(() => logger.info(`Connected to MongoDB at ${db}`))
    .catch((err) => {
      logger.error(`Could not connect to MongoDB: ${err.message}`);
      process.exit(1);
    });
};
