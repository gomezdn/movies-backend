const { UserWatchlist } = require('../models/UserWatchlist');
const { Movie } = require('../models/Movie');
const { User } = require('../models/User');

async function getUserWatchlist(req, res) {
  try {
    const userMovies = await User.findOne({
      where: { email: req.params.userEmail },
      include: Movie,
    });
    res.status(200).json({ userWatchlist: userMovies?.Movies || [] });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function addMovieToUserWatchlist(req, res) {
  try {
    const { id } = req.body;
    const { userEmail } = req.params;
    const existingMovie = await Movie.findByPk(id);

    const alreadyAdded = await UserWatchlist.findOne({
      where: { MovieId: id, UserEmail: userEmail },
    });

    if (alreadyAdded != null) {
      res.status(409).json({ message: 'Movie already added to watchlist' });
    } else if (existingMovie != null) {
      await UserWatchlist.create({
        UserEmail: userEmail,
        MovieId: id,
      });
    } else {
      await Movie.create(req.body);
      await UserWatchlist.create({
        UserEmail: userEmail,
        MovieId: id,
      });
    }

    res.status(201).json({ message: 'Movie added to watchlist' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

async function removeMovieFromUserWatchlist(req, res) {
  try {
    const { id } = req.body;
    const { userEmail } = req.params;
    const movieToRemove = await UserWatchlist.findOne({
      where: { MovieId: id, UserEmail: userEmail },
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
