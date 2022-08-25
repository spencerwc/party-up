const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const partySchema = new Schema({
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
        of: String,
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
    messages: {
        type: [Schema.Types.ObjectId],
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Party', partySchema);
