const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({ _id: id }, process.env.SECRET, {});
};

const getUser = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `User route: ${id}` });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `User PATCH route: ${id}` });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const signup = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const user = await User.signup(email, username, password);
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getUser, updateUser, login, signup };
