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

// Gets a list of Things
exports.index = function(req, res) {
    return Poll.find()
        .exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Thing from the DB
exports.show = function(req, res) {
    return Poll.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Thing in the DB
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

// Upserts the given Thing in the DB at the specified ID
exports.upsert = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    var user = req.user.id;
    var tags = [];
}

// Updates an existing Thing in the DB
exports.patch = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Poll.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}


// Deletes a Poll from the DB
exports.destroy = function(req, res) {
    return Poll.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}