const express = require('express');
const {
    getGroups,
    getGroup,
    createGroup,
    updateGroup,
    deleteGroup,
} = require('../controllers/groupController');

const router = express.Router();

router.get('/', getGroups);
router.get('/:id', getGroup);
router.post('/', createGroup);
router.patch('/:id', updateGroup);
router.delete('/:id', deleteGroup);

module.exports = router;
