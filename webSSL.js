var express = require('express'), https = require('https'), fs = require('fs');
var http = require('http');

var privateKey = fs.readFileSync('CA/mlb.key').toString();
var certificate = fs.readFileSync('CA/mlb.pem').toString();

var options = {
	key : privateKey,
	cert : certificate
}

var app = express();

app.use(express.favicon());
app.use(express.compress());
app.use('/',express.static(__dirname + '/www'));

app.get('*', function(req, res, next) {
    res.send('404 ERROR');
});


https.createServer(options, app).listen(443, function() {
	console.log('https server started successfully.');
});

http.createServer(app).listen(80, function() {
	console.log('http server started successfully.');
});