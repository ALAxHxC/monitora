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
var userTypesRouter= require('./routes/user_types')
var patientRouter = require('./routes/patient');
var medicRouter = require('./routes/medic');
var traigeRouter = require('./routes/triage');
var authRouter= require('./routes/auth');
var messageRouter=require('./routes/message');


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
app.use('/patient',patientRouter);
app.use('/permissions',userTypesRouter);
app.use('/auth',authRouter);
app.use('/traige',traigeRouter);
app.use('/medic',medicRouter);
app.use('/messages',messageRouter);
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
