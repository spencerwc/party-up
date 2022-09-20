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

const getFriendRequests = async (req, res) => {
    const userId = req.user._id;

    try {
        const friendRequests = await User.findById(userId)
            .select('friendRequestsSent friendRequestsReceived')
            .populate({
                path: 'friendRequestsSent',
                select: 'avatar username -_id',
            })
            .populate({
                path: 'friendRequestsReceived',
                select: 'avatar username -_id',
            });

        res.status(200).json(friendRequests);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const sendFriendRequest = async (req, res) => {
    const { username } = req.params;
    const userId = req.user._id;

    try {
        const recipient = await User.findOne({ username: username });

        if (!recipient) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if recipient has already previously requested friend
        if (recipient.friendRequestsSent.includes(userId)) {
            // If the request exists, add friends
            await User.updateOne(
                {
                    _id: recipient._id,
                },
                {
                    $addToSet: {
                        friends: userId,
                    },
                    $pull: {
                        friendRequestsSent: userId,
                    },
                }
            );

            const user = await User.findByIdAndUpdate(
                userId,
                {
                    $addToSet: {
                        friends: recipient._id,
                    },
                    $pull: {
                        friendRequestsReceived: recipient._id,
                    },
                },
                { new: true }
            );

            return res.status(200).json(user);
        }

        // Send a request to the recipient
        await User.updateOne(
            { username: username },
            {
                $addToSet: {
                    friendRequestsReceived: userId,
                },
            }
        );

        // Add the sent request to the sender
        const sender = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    friendRequestsSent: recipient._id,
                },
            },
            { new: true }
        );

        res.status(200).json(sender);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const cancelFriendRequest = async (req, res) => {
    const { username } = req.params;
    const userId = req.user._id;

    try {
        const recipient = await User.findOne({ username: username });

        if (!recipient) {
            return res.status(404).json({ error: 'User not found' });
        }

        await User.updateOne(
            { username: username },
            {
                $pull: {
                    friendRequestsReceived: userId,
                },
            }
        );

        const sender = await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    friendRequestsSent: recipient._id,
                },
            },
            { new: true }
        );

        res.status(200).json(sender);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addFriend = async (req, res) => {
    const { username } = req.params;
    const userId = req.user._id;

    try {
        // Query for the sender and add user to sender's friends list
        const userToAdd = await User.findOne({ username: username });

        if (!userToAdd) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!userToAdd.friendRequestsSent.includes(userId)) {
            return res.status(400).json({ error: 'Could not add friend' });
        }

        await User.updateOne(
            {
                _id: userToAdd._id,
            },
            {
                $addToSet: {
                    friends: userId,
                },
                $pull: {
                    friendRequestsSent: userId,
                },
            }
        );

        // Add sender to the user's friend list
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    friends: userToAdd._id,
                },
                $pull: {
                    friendRequestsReceived: userToAdd._id,
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
    getFriendRequests,
    sendFriendRequest,
    cancelFriendRequest,
    login,
    signup,
};
