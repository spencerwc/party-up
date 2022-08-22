const express = require('express');
const { getGames } = require('../controllers/gameController');
const generateAccessToken = require('../middleware/generateAccessToken');

const router = express.Router();

router.post('/', generateAccessToken, getGames);

module.exports = router;
