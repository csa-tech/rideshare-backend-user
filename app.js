var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var multer = require('multer');
var createError = require('http-errors');


var indexRouter = require('./routes/index');
var updateUser = require('./routes/updateUser');
var pageview = require('./routes/pageview');
var viewUser = require('./routes/viewUser');

var app = express();
var upload = multer({dast: 'upload/' });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/view-user', viewUser);
app.use('/update-user', updateUser);

module.exports = app;
