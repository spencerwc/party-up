const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        likes: {
            type: Number,
            min: 0,
        },
        replies: {
            type: [Schema.Types.ObjectId],
            ref: 'Comment',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
