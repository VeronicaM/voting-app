'use strict';

var express = require('express');
var controller = require('./poll.controller');
var router = express.Router();
var auth = require('../../auth/auth.service');

router.get('/', controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;