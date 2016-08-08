var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
app.use(express.static(__dirname + '/dist'));
/*app.listen(port);*/

app.use(function(req, res, next) {
    if(req.protocol !== 'https') {
        return res.status(403).send({message: 'SSL required'});
    }
    next();
});
app.listen(port);