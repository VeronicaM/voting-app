'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var Poll = require('../polls/poll.model');
var domain = process.env.NODE_ENV === 'development' ? 'http://localhost:4200/' : process.env.DOMAIN;

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        return res.status(statusCode).json(err);
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        return res.status(statusCode).send(err);
    };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    return User.find({}, '-salt -password').exec()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(handleError(res));
}

/**
 * Creates a new user
 */
exports.create = function(req, res) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({ _id: user._id }, config.secrets.session);
        res.json({ token: token });
    });
}

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    return User.findById(userId).exec()
        .then(user => {
            if (!user) {
                return res.status(404).end();
            }
            res.json(user);
        })
        .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    return User.findByIdAndRemove(req.params.id).exec()
        .then(function() {
            res.status(204).end();
        })
        .catch(handleError(res));
}

exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');

        res.json(user);
    });
}
exports.getPolls = function(req, res, next) {
        var userId = req.user._id;
        User.findOne({
            _id: userId
        }, function(err, user) {
            if (err) return next(err);
            if (!user) return res.status(401).send('Unauthorized');
            Poll.find({ user_id: userId }, function(err, polls) {
                if (err) return next(err);
                var cretedPolls = polls || [];
                Poll.find({ "votes.id.userId": { $eq: userId } }, function(err, vPolls) {
                    if (err) return next(err);
                    var votedPolls = vPolls || [];
                    res.json({ createdPolls: cretedPolls, votedPolls: votedPolls });
                });
            })
        });
    }
    /**
     * Authentication callback
     */
exports.authCallback = function(req, res) {
    res.redirect('/');
}