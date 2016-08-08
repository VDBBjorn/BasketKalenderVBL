var express = require('express');
var http = require('http');
var app = express();
app.use(express.static(__dirname + '/dist'));

app.use(function(req,res,next){
  if(req.headers['x-forwarded-proto']=='https')
    return res.redirect(['http://', req.get('Host'), req.url].join(''));
  else
    return next();
})

var server = http.createServer(app);

var port = process.env.PORT || 3000;
server.listen(port);
