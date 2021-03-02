const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  userUrl: String,
  name: String,
  realname: String,
  email: String,
  call: String,
  day: String,
  url: String,
  sex: String,
  sexx: String,
  introduce: {
    type: String,
    default: '这个人很懒，什么都没写！',
  },
  address: String,
  postcode: String,
  country: String,
});

module.exports = mongoose.model('User', UserSchema);
