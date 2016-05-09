/**
* Module dependencies.
*/
var express = require('express');
var compression = require('compression');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');

/**
* Controllers (route handlers).
*/
var homeController = require('./controllers/home');


/**
* Create Express server.
*/
var app = express();


/**
* Connect to MongoDB.
*/
/*
mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/sounds');
mongoose.connection.on('open', function() {
  console.log('MongoDB successfully opened');
})
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please ensure MongoDB is running.');
  process.exit(1);
});
*/


/**
* Express configuration.
*/
app.set('port', process.env.PORT || 8080 );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
* App Routes.
*/
app.get('/', homeController.index);

/**
* Error Handler.
*/
app.use(errorhandler());


app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
