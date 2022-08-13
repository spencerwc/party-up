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
    leader: {
        type: Schema.Types.ObjectId,
        // TODO: Make required
    },
    lookingFor: {
        type: Number,
        requireD: true,
        min: 1,
    },
    memberCount: {
        type: Number,
        required: true,
        min: 1,
    },
    members: {
        type: [Schema.Types.ObjectId],
        required: true,
    },
    messages: {
        type: [Schema.Types.ObjectId],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Party', partySchema);
