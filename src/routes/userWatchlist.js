const { Router } = require('express');
const userWatchlist = Router();

const {
  getUserWatchlist,
  addMovieToUserWatchlist,
  removeMovieFromUserWatchlist,
} = require('../controllers/userWatchlist');
const { validateUserWatchlist } = require('../validations/userWatchlist');

userWatchlist.get('/:userEmail', getUserWatchlist);
userWatchlist.post(
  '/:userEmail',
  validateUserWatchlist,
  addMovieToUserWatchlist
);
userWatchlist.delete('/:userEmail', removeMovieFromUserWatchlist);

module.exports = { userWatchlist };
