var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/Igniters');
var app = express();


app.use(cookieParser());
app.use(session( {secret: "String for encrypting cookies."} ));

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app_server','public')));
app.use(function(req, res, next)
        {
            req.db = db;
            next();
        });


app.use('/', indexRouter);
app.use('/users', usersRouter);
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
app.listen(3000);
