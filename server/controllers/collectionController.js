/*
 * @Author: Spring Breeze
 * @Date: 2021-03-04 10:24:04
 * @FilePath: \server\controllers\collectionController.js
 * @LastEditTime: 2021-03-04 22:51:26
 */
const Collection = require('../models/collection');
const Dynamic = require('../models/article');

exports.get = async function(req, res) {
  let user_id = req.query.userId || req.data.userid;
  let page = req.query.pageNumber || 1;
  let pageSize = req.query.pageSize || 9;
  let total = await Collection.countDocuments({ user_id });
  Collection.find({ user_id })
    .sort({
      _id: -1,
    })
    .limit(pageSize * 1)
    .skip((page - 1) * pageSize)
    .populate({ path: 'dynamic_id', populate: { path: 'writer' } })
    .exec((err, docs) => {
      let data = docs.map((item) => {
        return item.dynamic_id;
      });
      if (err) {
        console.log(err);
        return;
      }
      res.json({ code: 200, total, data });
    });
};

exports.status_post = function(req, res) {
  let user_id = req.data.userid;
  let dynamic_id = req.body.dynamic_id;
  Collection.find(
    {
      user_id,
      dynamic_id,
    },
    (err, doc) => {
      if (err) {
        console.log(err);
        return;
      }
      if (doc.length != 0) {
        return res.json({ status: 1 });
      }
      return res.json({ status: 0 });
    }
  );
};

exports.post = function(req, res) {
  let user_id = req.data.userid;
  let dynamic_id = req.body.dynamic_id;
  let collection = new Collection({
    user_id,
    dynamic_id,
  });
  collection.save((err) => {
    if (err) {
      console.log('Save Error :', err);
    }
    res.json({ msg: '增加成功' });
  });
  // Collection.findById({
  //     _id: dynamic_id
  // }, (err, doc) => {
  //     if (err) {
  //         console.log(err)
  //         return;
  //     }
  //     if (doc) {
  //         doc.collectState = 1;
  //         doc.save(err => {
  //             if (err) {
  //                 console.log(err)
  //             }
  //         })
  //         res.json({
  //             resultCode: 1
  //         })
  //     }
  // })
};

exports.delete = function(req, res) {
  let user_id = req.data.userid;
  let dynamic_id = req.body.dynamic_id;
  Collection.find({
    user_id,
    dynamic_id,
  }).remove((err) => {
    if (err) {
      console.log(err);
    }
    res.json({ msg: '取消成功' });
  });
  // Dynamic.findById({
  //     _id: dynamic_id
  // }, (err, doc) => {
  //     if (err) {
  //         console.log(err)
  //         return;
  //     }
  //     if (doc) {
  //         doc.collectState = 0;
  //         doc.save(err => {
  //             if (err) {
  //                 console.log(err)
  //             }
  //         })
  //         res.json({
  //             resultCode: 1
  //         })
  //     }
  // })
};
