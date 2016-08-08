var express = require('express');
var app = express.createServer();
app.use(express.static(__dirname + '/dist'));
app.get('*', function(req,res) {
	if(req.protocol == 'https') {
		return res.status(403).send({message: 'SSL not supported'});
	}
	next();
});
app.listen(80);


var https = require('https');
https.createServer(function(req,res) {
	res.writeHead(301, {"Location": "http://" + req.headers['host'] + req.url });
	res.end;
}).listen(443);
