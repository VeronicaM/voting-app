    /**
     * Express configuration
     */

    'use strict';

    var express = require('express');
    var favicon = require('serve-favicon');
    var morgan = require('morgan');
    var compression = require('compression');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    var cookieParser = require('cookie-parser');
    var errorHandler = require('errorhandler');
    var path = require('path');
    var config = require('./environment');
    var passport = require('passport');
    var session = require('express-session');
    var ejs = require('ejs');

    var expressFunction = function(app) {
        var env = app.get('env');

        app.set('views', config.root + '/server/views');
        app.engine('ejs', require('ejs').renderFile);
        app.set('view engine', 'ejs');
        app.use(compression());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(session({
            secret: 'Voting App Super Secret Session Key',
            saveUninitialized: true,
            resave: true
        }));
        app.use(methodOverride());
        app.use(cookieParser());
        app.use(passport.initialize());

        if ('production' === env) {
            app.use(express.static(path.join(config.root, 'dist')));
            app.use(favicon(path.join(config.root, 'dist', 'favicon.ico')));
            app.set('appPath', path.join(config.root, 'dist'));
        }

        if ('development' === env || 'test' === env) {
            app.set('appPath', path.join(config.root, 'src'));
            app.use(morgan('dev'));
            app.use(errorHandler()); // Error handler - has to be last
        }
    };
    module.exports = {
        appExpress: expressFunction
    }