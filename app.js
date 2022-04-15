var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// set env
var dotenv = require('dotenv');
dotenv.config({path: './conf/.env'});

// var routes
var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');
var authRouter = require('./routes/auth.js');
var itemRouter = require('./routes/items.js');
var storeRouter = require('./routes/store.js');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/auth', authRouter);
app.use('/item', itemRouter);
app.use('/store', storeRouter);

app.listen(process.env.PORT || 3000);