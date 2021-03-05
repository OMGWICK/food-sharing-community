/*
 * @Author: Spring Breeze
 * @Date: 2021-03-01 18:43:48
 * @FilePath: \food-sharing-community\server\app.js
 * @LastEditTime: 2021-03-05 12:15:54
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var vertoken = require('./token_vertify'); //token
var expressJWT = require('express-jwt');

var compression = require('compression'); //g

var app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cors设置
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

//token验证
app.use(function(req, res, next) {
  var token = req.headers['authorization'];
  if (token == undefined) {
    return next();
  } else {
    vertoken
      .verToken(token)
      .then((data) => {
        req.data = data;
        return next();
      })
      .catch((error) => {
        return next();
      });
  }
});

app.use(
  expressJWT({
    secret: 'food_sharepc_signkey',
    algorithms: ['HS256'],
  }).unless({
    path: ['/inapi/login', '/inapi/register'], //除了这个地址，其他的URL都需要验证
  })
);

app.use('/', indexRouter);
app.use('/inapi', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if (err.status == 401) {
    return res.status(401).send('token失效');
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//连接数据库
let connection = mongoose.connection;
mongoose.connect('mongodb://localhost/Gourmet_Share_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connection.on('connected', () => {
  console.log('MongoDb connected');
});
connection.on('err', (err) => {
  console.log('MongoDB connection Error', err.message);
});

// console.log("http://127.0.0.1:3000")

module.exports = app;
