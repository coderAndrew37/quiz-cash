// routes/users.js

const express = require("express");
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");
const router = express.Router();

router.post("/register", async (req, res) => {
  // Validate user input with Joi
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create and save user
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  res.send({ message: "User registered successfully" });
});

module.exports = router;
