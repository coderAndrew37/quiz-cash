const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../models/User");
const logger = require("../startup/logger"); // Import logger
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

// Register API
router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    logger.error(
      "Validation error during registration: " + error.details[0].message
    );
    return res.status(400).send(error.details[0].message);
  }

  try {
    // Use case-insensitive search for email
    let user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      logger.warn(
        "Attempt to register an already existing user: " + req.body.email
      );
      return res.status(400).send("User already registered.");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });
    res.status(201).send({ message: "User registered successfully", token });
  } catch (err) {
    logger.error("Unexpected error during registration: " + err.message);
    res.status(500).send("Internal server error.");
  }
});

// Login API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      logger.warn("Login attempt with invalid email: " + email);
      return res.status(400).send("Invalid email or password.");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      logger.warn("Login attempt with invalid password for email: " + email);
      return res.status(400).send("Invalid email or password.");
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, {
      expiresIn: "1h",
    });
    res.status(200).send({ message: "Logged in successfully", token });
  } catch (err) {
    logger.error("Unexpected error during login: " + err.message);
    res.status(500).send("Internal server error.");
  }
});

module.exports = router;
