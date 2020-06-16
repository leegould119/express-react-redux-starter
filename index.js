const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const strings = require('./config/strings');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
mongoose.Promise = global.Promise;

//Middleware
//connection string
app.use(cors());
mongoose
  .connect(strings.mongoose.connectionString, strings.mongoose.options)
  .catch((err) => console.log(err));

const connection = mongoose.connection;
connection
  .on('connected', () => {
    console.log('mongo db connected');
  })
  .on('error', (e) => {
    console.log('there is an error' + e);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/admin', require('./routes/user-routes'));

app.post(
  '/login',
  passport.authenticate('local', function (err, user) {
    console.log('authenticate post api ');
    console.log(user);
    console.log(err);
  })
);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
