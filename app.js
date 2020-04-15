var debug = require('debug')('express-locallibrary-tutorial:server');
var http = require('http');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var codvid19Router = require('./codvid19Router');
var winston = require('./config/winston');

var app = express();

app.use(morgan('combined', { stream: winston.stream }));

// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

// BODY PARSER
app.use( bodyParser.json() );
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


app.get( '/', function ( req, res ) {
  res.sendFile( path.join( __dirname, '/index.html' ) );
} );



app.post( '/api/v1/on-covid-19/', codvid19Router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
