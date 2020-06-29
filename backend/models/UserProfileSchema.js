const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('../models/UserSchema');
const AddressSchema = new Schema(
  {
    street: String,
    city: String,
    state: String,
    postalCode: Number
  },
  { _id: false }
);
const SocialLinksSchema = new Schema(
  {
    facebookLink: String,
    twitterLink: String,
    pinterestLink: String,
    linkedinLink: String
  },
  { _id: false }
);

const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  gender: String,
  avatarUrl: String,
  socialLinks: SocialLinksSchema,
  address: AddressSchema
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
