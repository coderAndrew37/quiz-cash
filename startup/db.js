const mongoose = require("mongoose");
const logger = require("./logger");

module.exports = function () {
  const mongoURI = process.env.MONGODB_URI;
  if (!mongoURI) {
    logger.error("MONGO_URI is not defined.");
    process.exit(1);
  }
  mongoose
    .connect(mongoURI)
    .then(() => logger.info("Connected to MongoDB"))
    .catch((err) => logger.error("Could not connect to MongoDB", err));
};
