const express = require('express');
const router = express.Router();
const { 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser,
    toggleUserStatus 
} = require('../controllers/userController');
const { auth, isAdmin } = require('../middleware/auth');

// All routes require authentication and admin role
router.use(auth, isAdmin);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/:id/toggle-status', toggleUserStatus);

module.exports = router;
