const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const partySchema = new Schema(
    {
        date: {
            type: Date,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        game: {
            type: Map,
            required: true,
        },
        leader: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        lookingFor: {
            type: Number,
            requireD: true,
            min: 1,
            max: 100,
        },
        members: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            required: true,
        },
        comments: {
            type: [Schema.Types.ObjectId],
            ref: 'Comment',
        },
        name: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Party', partySchema);
