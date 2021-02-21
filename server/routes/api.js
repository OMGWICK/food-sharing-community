var express = require('express');
var router = express.Router();
const userController=require("../controllers/userController");

router.post('/login', userController.login_post);

router.post('/register',userController.register_post);

module.exports = router;
