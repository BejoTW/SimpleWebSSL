var express = require('express'), https = require('https'), fs = require('fs');
var http = require('http');

var privateKey = fs.readFileSync('mlb.key').toString();
var certificate = fs.readFileSync('mlb.pem').toString();

var options = {
	key : privateKey,
	cert : certificate
}

var app = express();

// app.use(function(req, res, next) {
	// res.send('hello this is HTTP Web SV by node JS');
// });

app.use(express.favicon());
app.use(express.compress());
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(app.router);
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