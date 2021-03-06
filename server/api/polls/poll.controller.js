'use strict';

var jsonpatch = require('fast-json-patch');
var Poll = require('./poll.model');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
const ipify = require('ipify');

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function(entity) {
        try {
            jsonpatch.apply(entity, patches, /*validate*/ true);
        } catch (err) {
            return Promise.reject(err);
        }
        return entity.save();
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove().then(() => {
                res.status(204).end();
            });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Polls
exports.index = function(req, res) {
    return Poll.find()
        .sort([
            ['updatedAt', -1]
        ])
        .exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
};

// Gets a single Poll from the DB
exports.show = function(req, res) {
    Poll.findById(req.params.id, function(err, foundPoll) {
        if (err) return res.status(500).send('Something went wrong');
        if (!foundPoll) return res.status(404).send('Poll not found!');
        var id = getUserIP(req).then(function(id) {
            if (id.user !== 'anonymous') {
                var filteredValues = foundPoll.votes.filter(function(el) {
                    return id.user !== undefined ?
                        el.id.IP === id.IP || el.id.user === id.user :
                        el.id.IP === id.IP;
                });
                var votedValue = filteredValues[0] ? filteredValues[0].value : null;
                if (votedValue) {
                    sendVotedPoll(res, foundPoll, votedValue);
                } else {
                    res.status(200).send(foundPoll);
                }
            } else {
                res.status(200).send(foundPoll);
            }
        });
    });
};
// Creates a new Poll in the DB
exports.create = function(req, res) {
    var user = req.user.id;
    var newPoll = {
        text: req.body.text,
        options: req.body.options.split(','),
    };
    newPoll.user_id = user;
    Poll.create(newPoll, function(error, createdPoll) {
        res.send(createdPoll);
    });
};

// Updates an existing Poll in the DB
exports.update = function(req, res) {
    getUserIP(req).then(function(id) {
        var voteValue = req.body.voteValue;
        var vote = { id: id, value: voteValue };
        return Poll.findOneAndUpdate({
                $and: [{
                        $or: [
                            { _id: req.params.id },
                            { 'votes.id.userId': { $ne: id.userId } },
                        ],
                    },
                    { $or: [{ _id: req.params.id }, { 'votes.id.IP': { $ne: id.IP } }] },
                ],
            }, { $push: { votes: vote } }, { upsert: true },
            function(error, poll) {
                if (poll) {
                    poll.votes.push(vote);
                    var addNewOption = poll.options.indexOf(voteValue) == -1;
                    if (addNewOption) {
                        poll.options.push(voteValue);
                        poll.save(function(err, savedPoll) {
                            if (err) res.status(500).send('Something went wrong');
                            sendVotedPoll(res, savedPoll, voteValue);
                        });
                    } else {
                        sendVotedPoll(res, poll, vote);
                    }
                } else {
                    res.status(404).send('You have already voted!');
                }
            }
        );
    });
};

function getUserIP(req) {
    return new Promise(function(resolve, reject) {
        ipify().then(ip => {
            var id = new Object();
            if (req.body.user) {
                //if signed in user, get user id
                id.userId = req.body.user._id;
            }
            console.log(ip);
            id.IP = ip;
            resolve(id);
        });
    });
}

function sendVotedPoll(res, poll, voteValue) {
    poll.voted = true;
    poll.voteValue = voteValue;
    res.status(200).send(poll);
}
// Deletes a Poll from the DB
exports.destroy = function(req, res) {
    return Poll.findById(req.params.id)
        .exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
};