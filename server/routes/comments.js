const express = require('express');
const {
    likeComment,
    unlikeComment,
} = require('../controllers/commentController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.patch('/:id/like', requireAuth, likeComment);
router.patch('/:id/unlike', requireAuth, unlikeComment);

module.exports = router;
