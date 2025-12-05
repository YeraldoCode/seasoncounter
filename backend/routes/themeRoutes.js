const express = require('express');
const router = express.Router();
const {
    getActiveTheme,
    getAllThemes,
    createTheme,
    updateTheme,
    setActiveTheme,
    deleteTheme
} = require('../controllers/themeController');
const { auth, isAdmin } = require('../middleware/auth');

// Public route
router.get('/active', getActiveTheme);

// Protected admin routes
router.get('/', auth, isAdmin, getAllThemes);
router.post('/', auth, isAdmin, createTheme);
router.put('/:id', auth, isAdmin, updateTheme);
router.patch('/:id/activate', auth, isAdmin, setActiveTheme);
router.delete('/:id', auth, isAdmin, deleteTheme);

module.exports = router;
