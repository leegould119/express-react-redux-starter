const router = require('express').Router();
const User = require('../models/UserSchema');
// add remove users endpoints
router.get('/users', (req, res, next) => {
  return new Promise((resolve, reject)=>
  {
    User.find((err, users)).then((users) => res.send(users))};
});
router.post('/users', (req, res, next) => {
  // let body = req.body;
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  user.save().then((users) => res.send(users));
});

router.put('/users/:id', (req, res, next) => {
  let id = req.params.id;
  let body = req.body;
  console.log(`BODY : ${JSON.stringify(body)}`);
  res.send({ type: 'PUT', id: id, body: body });
});
router.delete('/users/:id', (req, res, next) => {
  let id = req.params.id;
  res.send({ type: 'DELETE', id: id });
  next();
});

module.exports = router;
