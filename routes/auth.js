// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Environment variables for JWT secrets
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

// Helper function to generate tokens
function generateAccessToken(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "15m" });
}

function generateRefreshToken(userId) {
  return jwt.sign({ userId }, jwtRefreshSecret, { expiresIn: "7d" });
}

// Registration Route
router.post("/register", async (req, res) => {
  // Validate request body using Joi schema from the User model
  const { error } = User.validateRegister(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    // Create and save new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  // Validate request body using Joi schema from the User model
  const { error } = User.validateLogin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;
  try {
    // Check if user exists and verify password
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Set refresh token in an HttpOnly cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Set access token in an HttpOnly cookie
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Protected Profile Route
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // Fetch user details excluding the password field
    const user = await User.findById(req.userId).select("name email");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Refresh Token Route
router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token provided" });

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, jwtRefreshSecret);
    const newAccessToken = generateAccessToken(decoded.userId);

    // Send new access token as a cookie
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.json({ message: "Access token refreshed" });
  } catch (ex) {
    res.status(403).json({ message: "Invalid or expired refresh token." });
  }
});

module.exports = router;
