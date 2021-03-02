/*
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \server\routes\api.js
 * @LastEditTime: 2021-03-02 19:14:21
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');

const storage = multer.diskStorage({
  //创建路径相对于启动目录
  destination(req, file, cb) {
    cb(null, 'public/upload/');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

router.post('/login', userController.login_post);

router.post('/register', userController.register_post);

router.post('/user/addArticle', articleController.article_post);

router.get('/user/articleLists', articleController.article_get);

router.post('/img/upload', upload.single('file'), (req, res) => {
  // console.log(req.file)
  const url = 'http://localhost:3000/upload/' + req.file.filename;
  res.json({ url });
});

router.get('/user/info', userController.userinfo_get);

//头像api
router.post('/userurl', userController.userUrl_post);

//修改个人信息
router.post('/user/info', userController.userinfo_post);

//获取用户的文章列表
router.get('/mine/articleLists', articleController.mine_get);

module.exports = router;
