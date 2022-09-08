const mongoose = require('mongoose');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');

const getLikes = async (req, res) => {
    const userId = req.user._id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ likedComments: user.likedComments });
};

const likeComment = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    if (!userId) {
        return res.status(400).json({ error: 'You must be logged in' });
    }

    // Check if ID is valid before query
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Party not found' });
    }

    // Increment the comment likes and add to user's liked Comments array
    try {
        const comment = await Comment.findByIdAndUpdate(
            id,
            {
                $inc: {
                    likes: 1,
                },
            },
            { new: true }
        );

        await User.findByIdAndUpdate(userId, {
            $addToSet: {
                likedComments: id,
            },
        });

        res.status(200).json(comment);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const unlikeComment = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    if (!userId) {
        return res.status(400).json({ error: 'You must be logged in' });
    }

    // Check if ID is valid before query
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Party not found' });
    }

    // Decrement the comment likes and pull from user's liked Comments array
    try {
        const comment = await Comment.findByIdAndUpdate(
            id,
            {
                $inc: {
                    likes: -1,
                },
            },
            { new: true }
        );

        await User.findByIdAndUpdate(userId, {
            $pull: {
                likedComments: id,
            },
        });

        res.status(200).json(comment);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getLikes,
    likeComment,
    unlikeComment,
};
