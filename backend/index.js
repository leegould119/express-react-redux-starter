const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

//Middleware
const port = process.env.port || 3000;
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,POST,PUT,PATCH, DELETE',
    credentials: true
  })
);

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport config
require('./config/passport-setup');
app.use(passport.initialize());

app.use('/', require('./routes/user-routes'));

app.listen(port, () => console.log(`Server is running on port ${port}`));
