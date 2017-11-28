'use strict';

var app = require('express');
var path = require('path');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');
var router = new app.Router();


router.get('/', auth.hasRole('admin'), controller.index);
router.get('/polls', auth.isAuthenticated(), controller.getPolls);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
module.exports = router;