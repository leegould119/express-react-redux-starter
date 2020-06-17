const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const port = process.env.port || 3000;

// CORS - cross origin resource sharing
const corsMethod = {
  origin: '*',
  methods: 'GET,HEAD,POST,PUT,PATCH, DELETE',
  credentials: true
};
app.use(cors(corsMethod));

function errorHandler(err, req, res, next) {
  res.json({ err: err });
}

//express body parser {USED FOR GETTING BODY AND FORM DATA}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
// api routes {THE FRONTEND HITS THESE ROUTES}

//passport config {USED FOR AUTHENTICATION}
require('./config/passport-setup');
app.use('/', require('./routes/user-routes'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
