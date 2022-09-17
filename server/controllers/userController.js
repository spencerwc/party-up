const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SECRET, {});
};

const getUser = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username: username })
            .select('username avatar parties -_id')
            .populate('parties');
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUser = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `User PATCH route: ${id}` });
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

module.exports = { getUser, updateUser, login, signup };
