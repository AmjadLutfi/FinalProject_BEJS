const Movie = require('../models').Movie;

const listMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).send(movies);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { listMovies };