const Joi = require('@hapi/joi');

const userWatchlistSchema = new Joi.object({
  userEmail: Joi.string().required().trim(),
  movieId: Joi.string().required().trim(),
});

async function validateUserWatchlist(req, res, next) {
  try {
    await userWatchlistSchema.validateAsync(req.body);
    next();
  } catch (e) {
    res.json({ message: e.message });
  }
}

module.exports = { validateUserWatchlist };
