/*var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
app.use(express.static(__dirname + '/dist'));
app.listen(8000);

var https = require('https');
https.createServer(function(req,res) {
	res.writeHead(301, {"Location": "http://" + req.headers['host'] + req.url });
	res.end;
}).listen(4433);
*/

var https = require('https');
var options = {};
https.createServer(options, function (req, res) {
    res.end('secure!');
}).listen(443);

// Redirect from http port 80 to https
var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);