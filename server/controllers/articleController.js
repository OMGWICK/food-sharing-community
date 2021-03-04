/*
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \server\controllers\articleController.js
 * @LastEditTime: 2021-03-04 21:20:07
 */
const Dynamic = require('../models/article');
const User = require('../models/users');

exports.article_post = function(req, res) {
  let { content, coverImgUrl, title } = req.body;
  let writer = req.data.userid;
  console.log(req.data, req.body);
  if (!content) {
    res.end();
  } else {
    let dynamic = new Dynamic({
      content,
      writer,
      coverImgUrl,
      title,
    });
    dynamic.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    res.json({
      code: 200,
      msg: '发表成功',
    });
  }
};

exports.article_get = async function(req, res) {
  let query = req.query.searchWord || '';
  let page = req.query.pageNumber || 1;
  let pageSize = req.query.pageSize || 24;
  try {
    const reg = new RegExp(query, 'i');
    let total = await Dynamic.countDocuments({});
    let data = await Dynamic.find({
      $or: [
        {
          title: {
            $regex: reg,
          },
        },
      ],
    })
      .sort({
        _id: -1,
      })
      .populate('writer')
      .limit(pageSize * 1)
      .skip((page - 1) * pageSize);
    res.json({
      total,
      data,
    });
  } catch (err) {
    console.log(err);
    res.send();
  }
};

exports.mine_get = async function(req, res) {
  let id = req.query.userId || req.data.userid;
  let page = req.query.pageNumber || 1;
  let pageSize = req.query.pageSize || 9;
  let total = await Dynamic.countDocuments({ writer: id });
  Dynamic.find({ writer: id }, 'title coverImgUrl created')
    .sort({
      _id: -1,
    })
    .populate('writer')
    .limit(pageSize * 1)
    .skip((page - 1) * pageSize)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json({ code: 200, total, docs });
    });
};

exports.good_get = function(req, res) {
  Dynamic.find({}, 'title coverImgUrl created')
    .populate('writer')
    .limit(8)
    .skip(3)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json({ code: 200, docs });
    });
};

exports.detail_get = function(req, res) {
  const _id = req.query.id;
  Dynamic.findOne({ _id })
    .populate('writer')
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json({ code: 200, data: docs });
    });
};

exports.oldlist_get = function(req, res) {
  Dynamic.find({}, 'title coverImgUrl')
    .populate('writer')
    .limit(8)
    .exec((err, docs) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json({ code: 200, docs });
    });
};
