const strings = {
  mongoose: {
    connectionString: 'mongodb://localhost/webApp',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  }
};

module.exports = strings;
