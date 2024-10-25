// models/user.js

const mongoose = require("mongoose");
const Joi = require("joi");

// Mongoose schema for User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// Model
const User = mongoose.model("User", userSchema);

// Joi validation for user input
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = { User, validateUser };
