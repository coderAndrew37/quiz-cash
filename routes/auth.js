const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Password complexity requirements
const passwordComplexity = new PasswordComplexity({
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
});

// Joi schema for registration validation
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: passwordComplexity.required(),
});

// Joi schema for login validation
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Helper function to generate tokens
function generateAccessToken(userId) {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "15m" }); // Short-lived token
}

function generateRefreshToken(userId) {
  return jwt.sign({ userId }, jwtRefreshSecret, { expiresIn: "7d" }); // Longer-lived token
}

// Registration Route
router.post("/register", async (req, res) => {
  // Validate request body against Joi schema
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store the refresh token in a secure cookie (HttpOnly)
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send access token as a cookie (HttpOnly)
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
    return res.status(401).send("Access denied. No refresh token provided.");

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
    res.status(403).send("Invalid or expired refresh token.");
  }
});

module.exports = router;
