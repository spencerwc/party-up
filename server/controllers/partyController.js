const mongoose = require('mongoose');
const Party = require('../models/partyModel');
const User = require('../models/userModel');

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
		.populate('messages');

	if (!party) {
		return res.status(404).json({ error: 'Party not found' });
	}

	res.status(200).json(party);
};

const createParty = async (req, res) => {
	const { date, details, lookingFor, memberCount, members, name } = req.body;
	const userId = req.user._id;

	// TODO: Add validation checks

	try {
		// Add messages as empty array
		const messages = [];
		const party = await Party.create({
			date,
			details,
			leader: userId,
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
	const userId = req.user._id;

	// Check if ID is valid before query
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Party not found' });
	}

	const party = await Party.findOneAndDelete({ _id: id });

	if (!party) {
		return res.status(404).json({ error: 'Party not found' });
	}

	res.status(200).json(party);
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

	// Add user to party members
	const updated = await Party.findByIdAndUpdate(
		{ _id: id },
		{
			$addToSet: {
				members: userId,
			},
		},
		{
			new: true,
		}
	);

	// Add party to user party list
	await User.findByIdAndUpdate(
		{
			_id: userId,
		},
		{
			$addToSet: {
				parties: id,
			},
		}
	);

	res.status(200).json(updated);
};

const leaveParty = async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;

	// Check if ID is valid before query
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'Party not found' });
	}

	// Remove user from party members
	const party = await Party.findByIdAndUpdate(
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

	if (!party) {
		return res.status(404).json({ error: 'Party not found' });
	}

	// Remove party from user list
	await User.findByIdAndUpdate(
		{
			_id: userId,
		},
		{
			$pull: {
				parties: id,
			},
		}
	);

	res.status(200).json(party);
};

module.exports = {
	getParties,
	getParty,
	createParty,
	updateParty,
	deleteParty,
	joinParty,
	leaveParty,
};
