const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity"); // Imported without using 'new'

// Define password complexity requirements
const passwordComplexity = PasswordComplexity({
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
});

// Mongoose schema for User
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password verification method
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Joi validation schemas
userSchema.statics.validateRegister = function (data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: passwordComplexity.required(),
  });
  return schema.validate(data);
};

userSchema.statics.validateLogin = function (data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

// Export model, check for existing model before creating
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
