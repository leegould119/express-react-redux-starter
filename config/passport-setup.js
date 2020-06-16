const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UserSchema');
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ email: username }, function (err, user) {
      //   console.log('user: ' + user + ' error : ' + err);
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      //   if (!user.verifyPassword(password)) {
      //     return done(null, false);
      //   }
      return done(null, user);
    });
  })
);
