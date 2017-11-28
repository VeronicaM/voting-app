'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PollSchema = new mongoose.Schema({
    text: String,
    options: [String],
    votes: [{ id: Object, value: String }],
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    voted: Boolean,
    voteValue: String
});
PollSchema.virtual('id').get(function() {
    return this._id;
});

module.exports = mongoose.model('Poll', PollSchema);