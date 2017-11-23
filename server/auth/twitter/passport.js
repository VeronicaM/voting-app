var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

exports.setup = function(User, config) {
    passport.use(new TwitterStrategy({
            consumerKey: config.twitter.consumerKey,
            consumerSecret: config.twitter.consumerSecret,
            callbackURL: config.twitter.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            User.findOne({
                'twitter.id_str': profile.id
            }, function(err, user) {
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.displayName,
                        role: 'user',
                        username: profile.username,
                        provider: 'twitter',
                        twitter: profile._json
                    });
                    user.save(function(err) {
                        if (err) return done(err);
                        done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }
    ));
};