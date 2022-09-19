const express = require('express');
const {
    getUser,
    updateUser,
    addFriend,
    removeFriend,
    login,
    signup,
} = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/:username', getUser);
router.patch('/:username', updateUser);
router.patch('/:username/friends/add', requireAuth, addFriend);
router.patch('/:username/friends/remove', requireAuth, removeFriend);
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
