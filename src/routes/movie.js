const { Router } = require('express');
const movie = Router();

const { getMovie, addMovie } = require('../controllers/movie');
const { validateMovie } = require('../validations/movie');

movie.get('/:movieId', getMovie);
movie.post('/', validateMovie, addMovie);

module.exports = { movie };
