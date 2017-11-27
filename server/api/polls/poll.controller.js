'use strict';

var jsonpatch = require('fast-json-patch');
var Poll = require('./poll.model');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

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
            return entity.remove()
                .then(() => {
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
        .exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Poll from the DB
exports.show = function(req, res) {
    return Poll.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Poll in the DB
exports.create = function(req, res) {
    var user = req.user.id;
    var newPoll = {
        text: req.body.text,
        options: req.body.options.split(',')
    };
    newPoll.userId = user;
    Poll.create(newPoll, function(error, createdPoll) {
        res.send(createdPoll);
    });
}


// Updates an existing Poll in the DB
exports.update = function(req, res) {
    var id = '';
    if (req.user) {
        //if signed in user, get user id
        id = req.user._id;
    } else {
        //else get PC's IP Address
        try {
            id = req.header('X-Forwarded-For').split(',')[0];
        } catch (ex) {
            id = "anonymous";
            //  console.log(ex);
        }

    }
    var voteValue = req.body.voteValue;
    var vote = { id: id, value: voteValue };
    return Poll.findOneAndUpdate({ _id: req.params.id, "votes.id": { $ne: id } }, { $push: { votes: vote } }, { upsert: true }, function(error, poll) {
        if (poll) {
            var addNewOption = poll.options.indexOf(voteValue) == -1;
            if (addNewOption) {
                poll.options.push(voteValue);
                poll.save();
            }
            res.status(200).send("You have succesffully voted!");
        } else {
            res.status(403).send("You have already voted!");
        }
    });

}


// Deletes a Poll from the DB
exports.destroy = function(req, res) {
    return Poll.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}