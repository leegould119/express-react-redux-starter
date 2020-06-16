const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const validPassword = require('../lib/passwordUtils').validPassword;
const User = require('../models/UserSchema');

const customFields = {
  usernameField: 'uname',
  passwordField: 'pw'
};
const verifyCallback = (username, password, callback) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        return callback(null, false);
      }
      const isValid = validPassword(password, user.hash, user.salt);
      if (isValid) {
        return callback(null, user);
      } else {
        return callback(null, false);
      }
    })
    .catch((err) => {
      callback(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
