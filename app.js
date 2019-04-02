var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AuthController = require('./auth/authcontroller');
var TicketController = require('./ticket/ticketcontroller')
var users = require('./routes/users');
var login = require('./routes/login');
var db = require('./db');
var app = express();
/* TODO:
display a login page for root website directory '/'
build a form in angular, and link it to register view, so users can be registered from angular site
allow users to be viewed from angular page(pretty much just connect node and angular)

*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

//urls must have /api/ in front due to proxy config'd in angular app(to deal with CORS)


app.use('/api/auth', AuthController);
app.use('/api/ticket', TicketController);

module.exports = app;
