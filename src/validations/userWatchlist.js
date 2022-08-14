const Joi = require('@hapi/joi');

const userWatchlistSchema = new Joi.object({
  UserId: Joi.string().required().trim(),
  MovieId: Joi.string().required().trim(),
});

async function validateUserWatchlist(req, res, next) {
  const data = { UserId: req.body.userData.id, MovieId: req.params.movieId };
  try {
    await userWatchlistSchema.validateAsync(data);
    next();
  } catch (e) {
    res.json({ message: e.message });
  }
}

module.exports = { validateUserWatchlist };
