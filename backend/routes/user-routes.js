const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const User = require('../models/UserSchema');
const Profile = require('../models/UserProfileSchema');
router.post('/logout', (req, res, next) => {
  req.logOut();
  res.json({ isLoggedIn: false });
  next();
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  try {
    const user = req.user;
    res.json({ userId: user._id, isLoggedIn: true });
    next();
  } catch {
    (err) => {
      res.json({
        erros: err,
        message: 'your user name or password doesnt exist'
      });
    };
  }
});

router.post('/register', (req, res, next) => {
  let username = { username: req.body.uname };

  User.findOne(username, (err, users) => {})
    .then((users) => {
      if (!users) {
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
        res.json({
          error: 'registration error',
          message: users.username + ' is already registered'
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/authorised', (req, res, next) => {
  const id = req.body.id;
  User.findById(id)
    .then((user) => {
      res.json({ userId: user._id, isLoggedIn: true });
      next();
    })
    .catch((error) => {
      res.json({ isLoggedIn: false });
      next(error);
    });
});

router.post('/profile', (req, res, next) => {
  let userId = req.body.userId;
  const newUserProfile = new Profile({
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    address: {
      street: req.body.address.street,
      city: req.body.address.city,
      state: req.body.address.state,
      postalCode: req.body.address.postalCode
    }
  });
  Profile.find({ userId: userId }).then((users) => {
    // res.json(users);
    if (!users) {
      newUserProfile.save().then((profile) => {
        res.send(profile);
        next();
      });
    } else {
      res.send({
        error: 'profile error',
        message: 'this user already has a profile'
      });
      next();
    }
  });
});

module.exports = router;
