const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { auth } = require('../middleware/auth');

// Public routes
router.get('/', eventController.getEvents);
router.get('/active', eventController.getActiveEvents);
router.get('/:name', eventController.getEventByName);

// Protected routes (admin only)
router.put('/', auth, eventController.updateEvent);
router.delete('/:name', auth, eventController.deleteEvent);

module.exports = router;
