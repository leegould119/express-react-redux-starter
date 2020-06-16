const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const crypto = require('crypto');
const database = require('./config/database');

//Middleware

app.use(cors());
//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport config
require('./config/passport-setup');

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', require('./routes/user-routes'));

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
