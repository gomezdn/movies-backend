const Joi = require('@hapi/joi');
const e = require('express');
const { getTokenData } = require('../config/jwt');

const signupSchema = new Joi.object({
  username: Joi.string().required().trim(),
  password: Joi.string().min(8).required().trim(),
  email: Joi.string().email().required().trim(),
});

async function validateSignup(req, res, next) {
  try {
    await signupSchema.validateAsync(req.body);
    next();
  } catch (e) {
    res.status(422).send({ message: e.message });
  }
}

async function validateToken(req, res, next) {
  const token = req.headers?.authorization?.split(' ')[1];

  try {
    req.body = { ...req.body, userData: await getTokenData(token) };
    next();
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
}

module.exports = { validateSignup, validateToken };
