const { Router } = require('express');
const userWatchlist = Router();

const {
  getUserWatchlist,
  addMovieToUserWatchlist,
  removeMovieFromUserWatchlist,
} = require('../controllers/userWatchlist');
const { validateUserWatchlist } = require('../validations/userWatchlist');
const { validateMovie } = require('../validations/movie');
const { validateToken } = require('../validations/auth');

userWatchlist.get('/', validateToken, getUserWatchlist);

userWatchlist.post(
  '/:movieId',
  validateToken,
  validateMovie,
  validateUserWatchlist,
  addMovieToUserWatchlist
);

userWatchlist.delete('/:movieId', validateToken, removeMovieFromUserWatchlist);

module.exports = { userWatchlist };
