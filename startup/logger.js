const winston = require("winston");

// Configure Winston logger
const logger = winston.createLogger({
  level: "info", // Minimum level to log (error, warn, info, etc.)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
  exitOnError: false, // Prevent exit on handled exceptions
});

module.exports = logger;
