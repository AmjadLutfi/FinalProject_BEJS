const express = require('express');
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/movies', authMiddleware, movieController.listMovies);

module.exports = router;