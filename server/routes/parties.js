const express = require('express');
const {
    getParties,
    getParty,
    createParty,
    updateParty,
    deleteParty,
} = require('../controllers/partyController');

const router = express.Router();

router.get('/', getParties);
router.get('/:id', getParty);
router.post('/', createParty);
router.patch('/:id', updateParty);
router.delete('/:id', deleteParty);

module.exports = router;
