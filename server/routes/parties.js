const express = require('express');
const {
    getParties,
    getParty,
    createParty,
    updateParty,
    deleteParty,
} = require('../controllers/partyController');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();

router.get('/', getParties);
router.get('/:id', getParty);
router.post('/', requireAuth, createParty);
router.patch('/:id', requireAuth, updateParty);
router.delete('/:id', requireAuth, deleteParty);

module.exports = router;
