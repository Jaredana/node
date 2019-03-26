var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AuthController = require('./auth/AuthController');
var users = require('./routes/users');
var login = require('./routes/login');
var db = require('./db');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

//urls must have /api/ in front due to proxy config'd in angular app(to deal with CORS)
app.use('/api/v1/users', users);
app.use('/api/v1/login', login);

app.use('/api/auth', AuthController);

module.exports = app;
