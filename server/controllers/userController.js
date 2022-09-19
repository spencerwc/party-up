const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SECRET, {});
};

const getUser = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username: username })
            .select('avatar bio friends parties username createdAt -_id')
            .populate('parties')
            .populate({
                path: 'friends',
                select: 'avatar username -_id',
            });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUser = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `User PATCH route: ${id}` });
};

const addFriend = async (req, res) => {
    const { username } = req.params;
    const userId = req.user._id;

    try {
        const friend = await User.findOneAndUpdate(
            { username: username },
            {
                $addToSet: {
                    friends: userId,
                },
            }
        );

        if (!friend) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    friends: friend._id,
                },
            },
            { new: true }
        );

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const removeFriend = async (req, res) => {
    const { username } = req.params;
    const userId = req.user._id;

    try {
        const friend = await User.findOneAndUpdate(
            { username: username },
            {
                $pull: {
                    friends: userId,
                },
            }
        );

        if (!friend) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    friends: friend._id,
                },
            },
            { new: true }
        );

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const username = user.username;
        const token = createToken(user._id);

        res.status(200).json({ email, username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const signup = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const user = await User.signup(email, username, password);
        const token = createToken(user._id);

        res.status(200).json({ email, username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getUser,
    updateUser,
    addFriend,
    removeFriend,
    login,
    signup,
};
