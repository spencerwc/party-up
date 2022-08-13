const express = require('express');
const {
    getUser,
    updateUser,
    login,
    signup,
} = require('../controllers/userController');

const router = express.Router();

router.get('/:id', getUser);
router.patch('/:id', updateUser);
router.post('/login', login);
router.post('/signup', signup);

module.exports = router;
