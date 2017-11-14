'use strict';

var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
    question: String,
    options: [String]
});
PollSchema.virtual('id').get(function() {
    return this._id;
});

module.exports = mongoose.model('Poll', PollSchema);