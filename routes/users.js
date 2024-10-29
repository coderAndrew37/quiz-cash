// routes/users.js

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../models/user");
const router = express.Router();

// JWT secret key (store securely in environment variables in production)
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

// Register API
router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "1h" });
  res
    .header("x-auth-token", token)
    .send({ message: "User registered successfully", token });
});

// Login API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "1h" });
  res
    .header("x-auth-token", token)
    .send({ message: "Logged in successfully", token });
});

module.exports = router;
