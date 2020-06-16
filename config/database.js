const strings = require('./strings');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
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
