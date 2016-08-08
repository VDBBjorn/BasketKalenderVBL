var express = require('express');
var port = process.env.PORT;
var app = express();
app.use(express.static(__dirname + '/dist'));
app.listen(port);