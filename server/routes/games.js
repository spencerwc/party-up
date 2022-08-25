const express = require('express');
const { getGames } = require('../controllers/gameController');
const requireAuth = require('../middleware/requireAuth');
const generateAccessToken = require('../middleware/generateAccessToken');

const router = express.Router();

router.post('/', requireAuth, generateAccessToken, getGames);

module.exports = router;
