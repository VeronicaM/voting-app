'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@ds261755.mlab.com:61755/voting-app'
    },
    'secret': process.env.secret,
    GOOGLE_ID: process.env.google_id,
    GOOGLE_SECRET: process.env.google_secret,
    seedDB: false
};