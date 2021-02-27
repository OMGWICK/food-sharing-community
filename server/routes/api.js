var express = require('express');
var router = express.Router();
const userController=require("../controllers/userController");
const articleController=require("../controllers/articleController");

router.post('/login', userController.login_post);

router.post('/register',userController.register_post);

router.post('/user/addArticle',articleController.article_post);

module.exports = router;
