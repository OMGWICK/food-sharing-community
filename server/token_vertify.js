var jwt = require('jsonwebtoken');
var signkey = 'food_sharepc_signkey';

exports.setToken = function (username, userid) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            username,
            userid,
        }, signkey, {
            expiresIn: 60 * 60 * 24
        });
        resolve(token);
    })
}

exports.verToken = function (token) {
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token.split(' ')[1], signkey);
        resolve(info);
    })
}