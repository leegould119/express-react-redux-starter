const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const User = require('../models/UserSchema');

// add remove users endpoints

router.get('/', (req, res, next) => {
  res.send('<h1>Register</h1>');
});
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const user = req.user;
  res.send(user);
});

router.post('/register', (req, res, next) => {
  const saltHash = genPassword(req.body.pw);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.uname,
    hash: hash,
    salt: salt
  });

  const userData = null;
  newUser.save().then((user) => {
    console.log(user);
    res.send(user);
  });
});

module.exports = router;
