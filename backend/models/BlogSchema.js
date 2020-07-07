const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('../models/UserSchema');

const BlogSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  blogTitle: String,
  blogDescription: String,
  blogCoverImage: String,
  blogCreationDate: Date,
  selectedCategories: String
});

const Blog = mongoose.model('blog', BlogSchema);

module.exports = Blog;
