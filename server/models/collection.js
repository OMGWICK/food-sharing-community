/*
 * @Author: Spring Breeze
 * @Date: 2021-03-04 10:22:49
 * @FilePath: \server\models\collection.js
 * @LastEditTime: 2021-03-04 10:23:28
 */
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CollectionSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    dynamic_id: {
      type: Schema.Types.ObjectId,
      ref: 'Dynamic',
    },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);

module.exports = mongoose.model('Collection', CollectionSchema);
