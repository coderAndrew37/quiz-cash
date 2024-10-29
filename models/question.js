// models/Question.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  question: { type: String, required: true },
  correct_answer: { type: String, required: true },
  incorrect_answers: [{ type: String }],
});

//validating the question model using joi

const Joi = require("joi");

const validateQuestion = (question) => {
  const schema = Joi.object({
    topic: Joi.string().required(),
    question: Joi.string().required(),
    correct_answer: Joi.string().required(),
    incorrect_answers: Joi.array().min(1).required(),
  });

  return schema.validate(question);
};

module.exports = mongoose.model("Question", questionSchema);
