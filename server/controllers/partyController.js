const mongoose = require('mongoose');
const Party = require('../models/partyModel');

const getParties = async (req, res) => {
    try {
        const parties = await Party.find().sort({ createdAt: -1 });
        res.status(200).json(parties);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getParty = async (req, res) => {
    const { id } = req.params;

    // Check if ID is valid before query
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Party not found' });
    }

    // Get the party using the ID and populate leader, members, and messages data
    const party = await Party.findById(id)
        .populate('leader')
        .populate('members')
        .populate('messages');

    if (!party) {
        return res.status(404).json({ error: 'Party not found' });
    }

    res.status(200).json(party);
};

const createParty = async (req, res) => {
    const { date, details, lookingFor, memberCount, members, name } = req.body;
    // TODO: Add validation checks

    // TODO: Add leader using user ID
    try {
        // Add messages as empty array
        const messages = [];
        const party = await Party.create({
            date,
            details,
            lookingFor,
            memberCount,
            members,
            messages,
            name,
        });

        res.status(200).json(party);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateParty = async (req, res) => {
    const { id } = req.params;

    // TODO: Add validation checks

    // Check if ID is valid before query
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Party not found' });
    }

    const party = await Party.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        },
        { new: true }
    );

    if (!party) {
        return res.status(404).json({ error: 'Party not found' });
    }

    res.status(200).json(party);
};

const deleteParty = async (req, res) => {
    const { id } = req.params;

    // Check if ID is valid before query
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Party not found' });
    }

    const party = await Party.findByIdAndDelete({ _id: id });

    if (!party) {
        return res.status(404).json({ error: 'Party not found' });
    }

    res.status(200).json(party);
};

module.exports = {
    getParties,
    getParty,
    createParty,
    updateParty,
    deleteParty,
};
