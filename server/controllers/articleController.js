const Dynamic = require('../models/article');
const User=require('../models/users');

exports.article_post = function (req, res) {
    // console.log(req.body)
    // let content = req.body.content;
    // let addTime = req.body.addTime;
    // let writer = req.session.userinfo.userid;
    // let imgUrl = req.body.imgUrl;
    let {content,coverImgUrl,title} = req.body;
    let writer = req.data.userid;
    console.log(req.data,req.body);
    if (!content) {
        res.end()
    } else {
        let dynamic = new Dynamic({
            content,
            writer,
            coverImgUrl,
            title,
        });
        dynamic.save((err) => {
            if(err){
            console.log(err)
        }
        })
        res.json({code: 200,msg:'发表成功'});
    }
};