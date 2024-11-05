const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/users.js");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const rateLimit = require("express-rate-limit");

// Apply rate limit to login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many login attempts. Please try again later.",
});

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
  const { error } = User.validateRegister(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    const user = new User({ name, email, password });
    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      username: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
// Login Route
router.post("/login", loginLimiter, async (req, res) => {
  const { error } = User.validateLogin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Set tokens as HTTP-only cookies
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    // Send the accessToken in the response JSON for the frontend
    res.json({
      message: "Login successful",
      token: accessToken, // <-- Include the accessToken here
      username: user.name,
      email: user.email,
    });
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

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, jwtRefreshSecret);
    const newAccessToken = generateAccessToken(decoded.userId);

    // Send the new access token back in the response
    res.json({ token: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token." });
  }
});

//Retreive the coins from the server
router.get("/coins", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("coins");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ coins: user.coins });
  } catch (error) {
    console.error("Error retrieving coins:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  // Clear both access and refresh tokens from cookies
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
