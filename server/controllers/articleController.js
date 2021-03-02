/*
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \server\controllers\articleController.js
 * @LastEditTime: 2021-03-02 21:56:45
 */
const Dynamic = require('../models/article');
const User = require('../models/users');

exports.article_post = function(req, res) {
  // console.log(req.body)
  // let content = req.body.content;
  // let addTime = req.body.addTime;
  // let writer = req.session.userinfo.userid;
  // let imgUrl = req.body.imgUrl;
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
    // Dynamic.find({}).sort({_id: -1}).populate('writer').exec((err,docs)=>{
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     let searchData = docs.filter(item=>{
    //         if(item.content.includes(query)){
    //             return true;
    //         }
    //     })
    //     res.json(searchData);
    // })
    const reg = new RegExp(query, 'i');
    let total = await Dynamic.countDocuments({});
    let data = await Dynamic.find({
      content: {
        $regex: reg,
      },
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
  let id = req.data.userid;
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
