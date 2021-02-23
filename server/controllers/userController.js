const Password = require('../models/password')
const User = require('../models/users')
const token = require('../token_vertify')

let apiTools = {};
apiTools.getSuRtnData = function (data) {
    return {
        resultCode: 1,
        ...data
    }
};
apiTools.getFailRtnData = function (errorCode, msg) {
    return {
        resultCode: 0,
        errorCode: errorCode,
        msg: msg,
    }
};
const ERROR_CODE = {
    login_error_1: {
        code: '1001',
        msg: '用户名或密码错误！'
    },
    login_error_2: {
        code: '1002',
        msg: '用户名已存在',
    },
    login_error_3: {
        code: '1003',
        msg: '注册失败',
    },
    login_error_5: {
        code: '1003',
        msg: '注销失败！'
    }
}


exports.login_post =async function (req, res) {
    console.log('login')
    let username = req.body.username;
    let password = req.body.password;
    Password.find({
        username,
        password
    }, (err, docs) => {
        if (docs.length != 0) {
            User.findOne({
                username
            }, (err, docs) => {
                if (err) {
                    console.log(err)
                }
                // console.log(docs)
                token.setToken(username, docs._id).then((data) => {
                    let obj = {
                        code: 200,
                        msg: "请求成功",
                        token: data,
                    }
                    res.json(apiTools.getSuRtnData(obj));
                })
            })
        } else {
            res.json(apiTools.getFailRtnData(ERROR_CODE.login_error_1.code, ERROR_CODE.login_error_1.msg));
        }
    })
}

exports.register_post =async function (req, res) {
    console.log("register")
    let username = req.body.username;
    let password = req.body.password;
    Password.find({username}).then(docs=>{
        if(docs.length == 0){
            let pwd = new Password({
                username,
                password
            });
            pwd.save(err=>{console.log(err)});
            let user = new User({
                username,
                name:username,
            })
            user.save().then(()=>{
                User.findOne({username}).then(doc=>{
                //  console.log(doc)
                 token.setToken(username, doc._id).then((data) => {
                     let obj = {
                     code: 200,
                     msg: "请求成功",
                     token: data,
                }
            res.json(apiTools.getSuRtnData(obj));
        })
                })
            }).catch(err=>{console.log(err)})
        }else{
            res.json(apiTools.getFailRtnData(ERROR_CODE.login_error_2.code, ERROR_CODE.login_error_2.msg));
        }
    }).catch(err=>{console.log(err)})

}