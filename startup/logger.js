// logger.js
const winston = require("winston");

// Check if the environment is production and conditionally set transports
const transports = [new winston.transports.Console({ handleExceptions: true })];

// Only add file transports in a local environment where logs can persist
if (process.env.NODE_ENV !== "production") {
  transports.push(
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" })
  );
}

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports,
  exitOnError: false,
});

module.exports = logger;
