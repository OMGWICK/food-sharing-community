/*
 * @Author: Spring Breeze
 * @Date: 2021-03-03 16:18:48
 * @FilePath: \server\models\comment.js
 * @LastEditTime: 2021-03-03 16:19:27
 */
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let CommentSchema = new Schema(
  {
    dynamic_id: {
      type: Schema.Types.ObjectId,
      ref: 'Dynamic',
    },
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    commentContent: String,
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);
module.exports = mongoose.model('Comment', CommentSchema);
