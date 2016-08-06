var express = require('express');
var port = 80;
var app = express();
app.use(express.static(__dirname + '/dist'));
app.listen(port);