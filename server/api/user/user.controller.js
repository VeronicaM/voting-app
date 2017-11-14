'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

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

/**
 * Change a users password
 */
exports.changePassword = function(req, res) {
        var userId = req.user._id;
        var oldPass = String(req.body.oldPassword);
        var newPass = String(req.body.newPassword);
        return User.findById(userId).exec()
            .then(user => {
                if (user.authenticate(oldPass)) {
                    user.password = newPass;
                    return user.save()
                        .then(() => {
                            res.status(204).end();
                        })
                        .catch(validationError(res));
                } else {
                    return res.status(422).end();
                }
            });
    }
    /**
     * Update a user's profile
     */

exports.updateProfile = function(req, res) {

}
exports.forgotPass = function(req, res) {

}

function sendEmail(res, email, message, subject) {

}
exports.resetPassword = function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            return res.status(404).end('token not found');
        }
        return res.status(200).end('found token');
    });
}
exports.resetPass = function(req, res) {


    }
    /**
     * Get my info
     */
exports.me = function(req, res, next) {

}

/**
 * Authentication callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
}