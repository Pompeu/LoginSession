'use strict';

const express      = require('express');
const path         = require('path');
const csrf         = require('csurf');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const routes       = require('./routes/index');
const sessions     = require('client-sessions');
const middleware   = require('./middlewares/index');
const app          = express();

mongoose.connect('mongodb://localhost/test');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const session    = sessions({
  cookieName     : 'session',
  secret         : 'you are newbie',// deve ser uma chave forte
  duration       : 7 * 60 * 60 * 1000,
  activeDuration : 5 * 60 * 1000,
  httpOnly       : true, //navegador nunca acesse meus cookies  secure         : true, //cookies samente https
  ephemeral      : true //deletar cookie quando nevagador har
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session);
app.use(middleware.session);

app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

