const express = require('express');
const {
    getParties,
    getParty,
    createParty,
    updateParty,
    deleteParty,
    addPartyMember,
    removePartyMember,
} = require('../controllers/partyController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/', getParties);
router.get('/:id', getParty);
router.post('/', requireAuth, createParty);
router.patch('/:id', requireAuth, updateParty);
router.delete('/:id', requireAuth, deleteParty);
router.patch('/:id/members/add', requireAuth, addPartyMember);
router.patch('/:id/members/remove', requireAuth, removePartyMember);

module.exports = router;
