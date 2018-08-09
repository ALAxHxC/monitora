//variables de entorno


global.expires=process.env.EXPIRES||86400;


var moongodb = require('./database/general/MongoInitBasic');
moongodb.initDataBase(app);


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var user_types= require('./routes/user_types')
var patient = require('./routes/patient');
var medic = require('./routes/medic');
var traigeRest = require('./routes/triage');
var auth= require('./routes/auth');



var firebase = require('./message/firebase');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/patient',patient);
app.use('/permissions',user_types);
app.use('/auth',auth);
app.use('/traige',traigeRest);
app.use('/medic',medic); 
//
//app.use('/permissions',user_types);
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
