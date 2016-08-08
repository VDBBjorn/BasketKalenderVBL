var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
app.use(express.static(__dirname + '/dist'));
/*app.listen(port);*/

function requireHttp(req, res, next) {
	if(req.secure) {
		return res.redirect('http://' + req.get('host') + req.url);
	}
	next();
}

app.use(requireHttp);
app.listen(port);