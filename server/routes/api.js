/*
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \server\routes\api.js
 * @LastEditTime: 2021-03-04 21:09:02
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
const userController = require('../controllers/userController');
const articleController = require('../controllers/articleController');
var commentController = require('../controllers/commentController');
var collectionController = require('../controllers/collectionController');

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
//增加文章
router.post('/user/addArticle', articleController.article_post);
//获取文章
router.get('/user/articleLists', articleController.article_get);
//上传
router.post('/img/upload', upload.single('file'), (req, res) => {
  // console.log(req.file)
  const url = 'http://localhost:3000/upload/' + req.file.filename;
  res.json({ url });
});
//获取用户信息
router.get('/user/info', userController.userinfo_get);

//头像api
router.post('/userurl', userController.userUrl_post);

//修改个人信息
router.post('/user/info', userController.userinfo_post);

//获取用户的文章列表
router.get('/mine/articleLists', articleController.mine_get);

//获取精选文章
router.get('/good/articleList', articleController.good_get);

//获取详情页
router.get('/detail/articleList', articleController.detail_get);

//增加评论
router.post('/addComment', commentController.post);
//获取评论
router.get('/getComment', commentController.get);
//删除评论
router.delete('/delComment', commentController.delete);

//收藏api
router.get('/getCollection', collectionController.get);
//增加
router.post('/postCollection', collectionController.post);
//删除
router.delete('/deleteCollection', collectionController.delete);
//获取收藏状态
router.post('/status/collection', collectionController.status_post);

//获取远古文章
router.get('/oldLists', articleController.oldlist_get);

module.exports = router;
