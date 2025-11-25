const express = require('express');
const router = express.Router();
const { login, getProfile, createAdmin } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.post('/register', authMiddleware, createAdmin);

module.exports = router;
