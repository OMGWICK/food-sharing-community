/*
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \server\models\users.js
 * @LastEditTime: 2021-03-03 10:42:06
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  userUrl: {
    type: String,
    default:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  },
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
