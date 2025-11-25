const express = require('express');
const router = express.Router();
const { getSeasons, getSeasonByGame, updateSeason } = require('../controllers/seasonController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getSeasons);
router.get('/:game', getSeasonByGame);
router.post('/', authMiddleware, updateSeason);

module.exports = router;
