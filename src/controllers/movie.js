const { Movie } = require('../models/Movie');

async function getMovie(req, res) {
  try {
    const movie = await Movie.findByPk(req.params.movieId);

    if (movie != null) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found with that ID' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
}

async function addMovie(req, res) {
  try {
    await Movie.create(req.body);
    res.status(200).json({ message: 'Movie stored succesfully' });
  } catch (e) {
    res.status(500).json(e);
  }
}

module.exports = { getMovie, addMovie };
