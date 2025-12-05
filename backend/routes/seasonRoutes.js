const express = require('express');
const router = express.Router();
const { 
    getSeasons, 
    getSeasonByGame, 
    updateSeason, 
    deleteSeason,
    getActiveSeasons 
} = require('../controllers/seasonController');
const { auth, isAdmin } = require('../middleware/auth');

// Public routes - accessible without authentication
router.get('/', getSeasons);
router.get('/active/all', getActiveSeasons);
router.get('/:game', getSeasonByGame);

// Protected admin routes - require authentication and admin role
router.post('/', auth, isAdmin, updateSeason);
router.put('/:game', auth, isAdmin, updateSeason);
router.delete('/:game', auth, isAdmin, deleteSeason);

module.exports = router;
