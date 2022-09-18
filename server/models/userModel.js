const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        avatar: {
            type: String,
        },
        bio: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        groups: {
            type: [Schema.Types.ObjectId],
        },
        friends: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
        },
        likedComments: {
            type: [Schema.Types.ObjectId],
            ref: 'Comment',
        },
        parties: {
            type: [Schema.Types.ObjectId],
            ref: 'Party',
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.statics.signup = async function (email, username, password) {
    if (!email || !password) {
        throw new Error('All fields must be filled in.');
    }

    if (!validator.isEmail(email)) {
        throw new Error('Email address is not valid.');
    }

    const emailExists = await this.findOne({ email });

    if (emailExists) {
        throw new Error('Email address already in use.');
    }

    const usernameExists = await this.findOne({ username });

    if (usernameExists) {
        throw new Error('Username is not available');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
        email,
        username,
        password: hash,
    });

    return user;
};

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw new Error('All fields must be filled in.');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw new Error('Invalid username or password.');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Invalid username or password.');
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);
