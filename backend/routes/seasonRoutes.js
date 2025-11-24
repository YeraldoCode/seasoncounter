const express = require('express');
const router = express.Router();
const { getSeasons, getSeasonByGame, updateSeason } = require('../controllers/seasonController');

router.get('/', getSeasons);
router.get('/:game', getSeasonByGame);
router.post('/', updateSeason);

module.exports = router;
