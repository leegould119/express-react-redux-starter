const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const strings = require('./strings/strings');
mongoose.Promise = global.Promise;

//Middleware
// connection string
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

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
