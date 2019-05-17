//variables de entorno


global.expires = process.env.EXPIRES || 86400;


const moongodb = require('./database/general/MongoInitBasic');
moongodb.initDataBase(app);


const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const userTypesRouter = require('./routes/user_types')
const patientRouter = require('./routes/patient');
const medicRouter = require('./routes/medic');
const traigeRouter = require('./routes/triage');
const authRouter = require('./routes/auth');
const messageRouter = require('./routes/message');
const inboxRouter = require('./routes/inbox');
const tipificationRouter = require('./routes/typification');

var firebase = require('./message/firebase');
var app = express();
var cors = require('cors')
app.use(cors())

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
app.use('/patient', patientRouter);
app.use('/permissions', userTypesRouter);
app.use('/auth', authRouter);
app.use('/traige', traigeRouter);
app.use('/medic', medicRouter);
app.use('/messages', messageRouter);
app.use('/inbox', inboxRouter);
app.use('/typification', tipificationRouter);
//
//app.use('/permissions',user_types);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
