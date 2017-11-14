'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var User = require('../../api/user/user.model')
var router = express.Router();
router.post('/', function(req, res, next) {
    var redirect_uri = req.body.redirectUri;
    passport.authenticate('local', function(err, user, info) {
        var error = err || info;
        if (error) {
            return res.status(401).json(error);
        }
        if (!user) {
            return res.status(404).json({ message: 'Something went wrong, please try again.' });
        }
        var token = auth.signToken(user._id, user.role);
        var newUser = {
            token: token,
            email: user.email,
            name: user.name,
            _id: user._id,
            provider: user.provider
        };

        return res.json(newUser);

    })(req, res, next);
});


module.exports = router;