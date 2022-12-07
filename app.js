var express = require('express');
var path = require('path');
var homeRoute = require('./routes/home');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/home', homeRoute);

module.exports = app;
