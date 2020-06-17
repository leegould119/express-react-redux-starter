const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const User = require('../models/UserSchema');
const { findOne } = require('../models/UserSchema');

// add remove users endpoints

// router.post('/validate', (req, res, next) => {
//   let id = req.body.data;
//   console.log(id);
//   const users = null;
//   User.findById(id, (err, users) => {
//     if (err) {
//       res.send('error');
//     } else {
//       res.send(users._id);
//     }
//   });
// });

router.get('/logout', function (req, res, next) {
  req.logout();
  res.send('logged out');
  next();
});
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const user = req.user;
  res.send(user);
});

router.post('/register', (req, res, next) => {
  let username = { username: req.body.uname };

  User.findOne(username, (err, users) => {}).then((users) => {
    if (users.username === null) {
      const saltHash = genPassword(req.body.pw);
      const salt = saltHash.salt;
      const hash = saltHash.hash;

      const newUser = new User({
        username: req.body.uname,
        hash: hash,
        salt: salt
      });
      newUser.save().then((user) => {
        console.log(user);
        res.send(user);
      });
    } else {
      res.send(users.username + ' is already registered ');
    }
  });
});

module.exports = router;
