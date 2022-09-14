const mongoose = require('mongoose');
const Party = require('../models/partyModel');
const User = require('../models/userModel');
const Comment = require('../models/commentModel');

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
        .populate({
            path: 'leader',
            select: 'username avatar -_id',
        })
        .populate({ path: 'members', select: 'username avatar -_id' })
        .populate({
            path: 'comments',
            populate: { path: 'user', select: 'username avatar -_id' },
        });

    if (!party) {
        return res.status(404).json({ error: 'Party not found' });
    }

    res.status(200).json(party);
};

const createParty = async (req, res) => {
    const { date, details, lookingFor, name, game } = req.body;
    const userId = req.user._id;

    if (!date || !details || !lookingFor || !name) {
        return res.status(400).json({ error: 'All fields must be filled' });
    }

    if (name.length === 0) {
        return res.status(400).json({ error: 'Name must be provided' });
    }

    if (details.length === 0) {
        return res.status(400).json({ error: 'Details must be provided' });
    }

    if (lookingFor <= 0 || lookingFor > 100) {
        return res
            .status(400)
            .json({ error: 'Members must be between 1 and 100' });
    }

    if (!game) {
        return res.stats(400).json({ error: 'A game must be provided' });
    }

    try {
        const party = await Party.create({
            date,
            details,
            leader: userId,
            lookingFor,
            members: [userId],
            name,
            game,
        });

        res.status(200).json(party);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateParty = async (req, res) => {
    const { id } = req.params;
    const { date, details, lookingFor, name, game } = req.body;
    const userId = req.user._id;

    // TODO: Add validation checks
    if (!date || !details || !lookingFor || !name) {
        return res.status(400).json({ error: 'All fields must be filled' });
    }

    if (name.length === 0) {
        return res.status(400).json({ error: 'Name must be provided' });
    }

    if (details.length === 0) {
        return res.status(400).json({ error: 'Details must be provided' });
    }

    if (lookingFor <= 0 || lookingFor > 100) {
        return res
            .status(400)
            .json({ error: 'Members must be between 1 and 100' });
    }

    if (!game) {
        return res.stats(400).json({ error: 'A game must be provided' });
    }

    // Check if ID is valid before query
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Party not found' });
    }

    const party = await Party.findById(id);

    if (!party) {
        return res.status(404).json({ error: 'Party not found' });
    }

    // Check if user has permissions update
    if (!userId.equals(party.leader)) {
        return res.status(400).json({ error: 'Insufficient permissions' });
    }

    const updated = await Party.findOneAndUpdate(
        { _id: id },
        {
            date,
            details,
            lookingFor,
            name,
            game,
        },
        { new: true }
    );

    res.status(200).json(updated);
};

const deleteParty = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    // Check if ID is valid before query
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Party not found' });
    }

    const party = await Party.findById(id);

    if (!party) {
        return res.status(404).json({ error: 'Party not found' });
    }

    // Check if user has permissions to delete
    if (!userId.equals(party.leader)) {
        return res.status(400).json({ error: 'Insufficient permissions' });
    }

    const deleted = await Party.findOneAndDelete({ _id: id });

    res.status(200).json(deleted);
};

const joinParty = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    // Check if ID is valid before query
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Party not found' });
    }

    const party = await Party.findById({ _id: id });

    if (!party) {
        return res.status(404).json({ error: 'Party not found' });
    }

    // Check if party is full by checking member length vs lookingFor amount - Subtract one for leader
    if (party.lookingFor - (party.members.length - 1) <= 0) {
        return res.status(500).json({ error: 'Could not not join party' });
    }

    try {
        // Add party to user party list
        const user = await User.findByIdAndUpdate(
            {
                _id: userId,
            },
            {
                $addToSet: {
                    parties: id,
                },
            }
        );

        // Add user to party members
        await Party.findByIdAndUpdate(
            { _id: id },
            {
                $addToSet: {
                    members: userId,
                },
            }
        );

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const leaveParty = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    // Check if ID is valid before query
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Party not found' });
    }

    try {
        // Remove party from user list
        const user = await User.findByIdAndUpdate(
            {
                _id: userId,
            },
            {
                $pull: {
                    parties: id,
                },
            }
        );

        // Remove user from party members
        await Party.findByIdAndUpdate(
            { _id: id },
            {
                $pull: {
                    members: userId,
                },
            },
            {
                new: true,
            }
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addComment = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Party not found' });
    }

    try {
        // Create the comment and add to the party
        let comment = await Comment.create({
            user: userId,
            comment: req.body.comment,
            likes: 0,
        });

        await Party.findByIdAndUpdate(
            {
                _id: id,
            },
            {
                $addToSet: {
                    comments: comment,
                },
            }
        );

        // Populate the user before sending response
        comment = await comment.populate('user');
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getParties,
    getParty,
    createParty,
    updateParty,
    deleteParty,
    joinParty,
    leaveParty,
    addComment,
};
