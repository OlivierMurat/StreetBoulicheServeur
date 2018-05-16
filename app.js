var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('./io/io.js')(io);

app.use("/", express.static(__dirname + "/public"));

http.listen(3001, function(){
	console.log('Server is listening on *:3001');
});