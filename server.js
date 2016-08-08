var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
app.use(express.static(__dirname + '/dist'));
var port = process.env.PORT ||3000;
app.listen(80);