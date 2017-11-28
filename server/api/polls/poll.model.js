'use strict';

var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
    text: String,
    options: [String],
    votes: [{ id: String, value: String }],
    user_id: {
        type: Number,
        ref: 'User'
    },
    voted: Boolean,
    voteValue: String
});
PollSchema.virtual('id').get(function() {
    return this._id;
});

module.exports = mongoose.model('Poll', PollSchema);