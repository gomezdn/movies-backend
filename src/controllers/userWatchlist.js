const { UserWatchlist } = require('../models/UserWatchlist');
const { Movie } = require('../models/Movie');
const { User } = require('../models/User');

async function getUserWatchlist(req, res) {
  try {
    const userMovies = await User.findOne({
      where: { id: req.body.userData.id },
      include: Movie,
    });
    res.status(200).json({ userWatchlist: userMovies?.Movies || [] });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function addMovieToUserWatchlist(req, res) {
  try {
    const { id } = req.body.userData;
    const { movieId } = req.params;

    const existingMovie = await Movie.findByPk(movieId);
    const alreadyAdded = await UserWatchlist.findOne({
      where: { MovieId: movieId, UserId: id },
    });

    if (existingMovie == null) {
      await Movie.create(req.body);
    } else if (alreadyAdded == null) {
      await UserWatchlist.create({
        UserId: userId,
        MovieId: movieId,
      });
      res.status(201).json({ message: 'Movie added to watchlist' });
    } else {
      res.status(409).json({ message: 'Movie already in watchlist' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function removeMovieFromUserWatchlist(req, res) {
  try {
    const { id } = req.body.userData;
    const { movieId } = req.params;

    const movieToRemove = await UserWatchlist.findOne({
      where: { MovieId: movieId, UserId: id },
    });

    if (movieToRemove != null) {
      await movieToRemove.destroy();
      res.status(204).json({ message: 'Movie removed succesfully' });
    } else {
      res.status(404).json({ message: 'Movie not present in user watchlist' });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
  getUserWatchlist,
  addMovieToUserWatchlist,
  removeMovieFromUserWatchlist,
};
