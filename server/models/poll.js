const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
    question: {
        type: String,
        require: true,
    },
    choices: [{
        choice: {
            type: String,
            required: true,
        },
        votes: {
            type: Number,
            default: 0,
        },
    }],
    totalVotes: {
        type: Number,
        default: 0,
    },
    author: {
        type: String,
        require: true,
    },
});

const Poll = mongoose.model('poll', pollSchema);

module.exports = Poll;
