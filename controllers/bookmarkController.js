const { User, Movie, Bookmark } = require('../models');

const addBookmark = async (req, res) => {
  try {
    const { id: userId } = req.user; 
    const { movieId } = req.params;  

    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }

    const existingBookmark = await Bookmark.findOne({
      where: { userId, movieId }
    });
    if (existingBookmark) {
      return res.status(400).send({ message: "Movie already bookmarked" });
    }

    const bookmark = await Bookmark.create({ userId, movieId });

    res.status(201).send({
      message: "Success adding new bookmark",
      id: bookmark.id,
      userId: bookmark.userId,
      movieId: bookmark.movieId,
      movieTitle: movie.title
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getMyBookmarks = async (req, res) => {
  try {
    const { id: userId } = req.user; 

    
    const bookmarks = await Bookmark.findAll({
      where: { userId },
      include: [{
        model: Movie,
        attributes: ['id', 'title', 'synopsis', 'trailerUrl', 'imgUrl', 'rating', 'status']
      }]
    });

    res.status(200).send(bookmarks);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addBookmark, getMyBookmarks };