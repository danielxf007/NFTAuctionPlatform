var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const db_url = require('./config/db_url.json');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
const user_db_url = db_url["clients_db"];
var index_router = require('./routes/index');
var users_router = require('./routes/user');
var sign_up_router = require('./routes/sign-up');
var sign_in_router = require('./routes/sign-in');
var user_router = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'this secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: user_db_url,
    client: 'session'
  }),
  user_name: '',
  minted_nfts: [],
  cookie:{}
}));

app.use('/', index_router);
app.use('/users', users_router);
app.use('/sign-up', sign_up_router);
app.use('/sign-in', sign_in_router);
app.use('/user', user_router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
