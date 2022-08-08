const Joi = require('@hapi/joi');

const movieSchema = Joi.object({
  id: Joi.string().required().trim(),
  type: Joi.string().required().trim(),
  imgUrl: Joi.string().uri().required().trim(),
  title: Joi.string().required().trim(),
  titleForUsl: Joi.string().required().trim(),
  year: Joi.string().required().trim(),
  overview: Joi.string().required().trim(),
});

async function validateMovie(req, res, next) {
  try {
    await movieSchema.validateAsync(req.body);
    next();
  } catch (e) {
    res.json({ message: e.message });
  }
}
module.exports = { validateMovie };
