const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const helpers = require('./helpers');
const port = process.env.port || 3000;
const multer = require('multer');
const path = require('path');
// CORS - cross origin resource sharing
let whitelist = ['http://localhost:8080', 'http://localhost:8081'];
let corsOptionsDelegate = (req, cb) => {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  cb(null, corsOptions);
};
const corsMethod = {
  // origin: '*',
  methods: 'GET,HEAD,POST,PUT,PATCH, DELETE',
  credentials: true
};
// use cors
app.use(cors(corsOptionsDelegate));
// pre flight requests
app.options('*', cors(corsOptionsDelegate));

function errorHandler(err, req, res, next) {
  res.json({ err: err });
}

//express body parser {USED FOR GETTING BODY AND FORM DATA}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(express.static(__dirname + '/public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      'user-avatar-image' + Date.now() + path.extname(file.originalname)
    );
  }
});

app.post('/upload-profile-pic', (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  let upload = multer({
    storage: storage,
    fileFilter: helpers.imageFilter
  }).single('file');

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    console.log(req);
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send('Please select an image to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    res.send(req.file.path);
  });
});

const bannerstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      'blog-banner-image' + Date.now() + path.extname(file.originalname)
    );
  }
});

app.post('/upload-banner-pic', (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  let upload = multer({
    storage: bannerstorage,
    fileFilter: helpers.imageFilter
  }).single('file');

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any
    console.log(req);
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send('Please select an image to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    res.send(req.file.path);
  });
});

//passport config {USED FOR AUTHENTICATION}
require('./config/passport-setup');
app.use('/', require('./routes/user-routes'));
app.use('/blog', require('./routes/blog-routes'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
