'use strict';

var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
    text: String,
    options: [String],
    votes: [String],
    user_id: {
        type: Number,
        ref: 'User'
    }
});
PollSchema.virtual('id').get(function() {
    return this._id;
});

module.exports = mongoose.model('Poll', PollSchema);