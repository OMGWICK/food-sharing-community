/*
 * @Author: Spring Breeze
 * @Date: 2021-03-03 16:21:05
 * @FilePath: \server\controllers\commentController.js
 * @LastEditTime: 2021-03-03 16:36:10
 */
const Comment = require('../models/comment');
const User = require('../models/users');

exports.post = function(req, res) {
  let dynamic_id = req.body.dynamic_id;
  let commentContent = req.body.commentContent;
  let writer = req.data.userid;
  if (!commentContent) {
    res.end();
  } else {
    let comment = new Comment({
      dynamic_id,
      commentContent,
      writer,
    });
    comment.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({
      msg: '评论成功',
    });
  }
};
exports.get = function(req, res) {
  let id = req.query.id;
  Comment.find({ dynamic_id: id })
    .populate('writer')
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json(docs);
    });
};
exports.delete = function(req, res) {
  console.log(req.body);
  let _id = req.body.id;
  Comment.findById({ _id }, function(err, doc) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(doc);
    if (doc) {
      doc.remove((err) => {
        if (err) {
          console.log('delete err', err);
        } else {
          res.json({ msg: '删除成功' });
        }
      });
    }
  });
};
