const Joi = require('@hapi/joi');

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

module.exports = { validateSignup };
