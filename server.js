var express = require('express');
var http = require('http');
var app = express();
app.use(express.static(__dirname + '/dist'));
var server = http.createServer(app);

app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']=='https')
    res.redirect('http://rapidmatches.herokuapp.com'+req.url)
  else
    next() /* Continue to other routes if we're not redirecting */
})

var port = process.env.PORT ||3000;
app.listen(80);
