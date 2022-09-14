const express = require('express');
const {
    getParties,
    getParty,
    createParty,
    updateParty,
    deleteParty,
    joinParty,
    leaveParty,
    addComment,
    deleteComment,
} = require('../controllers/partyController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/', getParties);
router.get('/:id', getParty);
router.post('/', requireAuth, createParty);
router.patch('/:id', requireAuth, updateParty);
router.delete('/:id', requireAuth, deleteParty);
router.patch('/:id/members/join', requireAuth, joinParty);
router.patch('/:id/members/leave', requireAuth, leaveParty);
router.post('/:id/comments', requireAuth, addComment);
router.delete('/:partyId/comments/:commentId', requireAuth, deleteComment);

module.exports = router;
