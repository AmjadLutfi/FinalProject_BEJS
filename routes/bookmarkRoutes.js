const express = require('express');
const bookmarkController = require('../controllers/bookmarkController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/bookmark/:movieId', authMiddleware, bookmarkController.addBookmark);
router.get('/mybookmark', authMiddleware, bookmarkController.getMyBookmarks);

module.exports = router;