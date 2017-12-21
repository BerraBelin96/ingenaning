var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function (request, response) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log("a user connected" + socket.request.connection.remoteAddress);
    io.emit('userMsg', 'User connected');

    socket.on('chat', function (msg) {
        io.emit('chat', msg);
    });

    socket.on('pMove', function (move) {
        io.emit('pMove', move);
    });
});

http.listen(3000, function() {
	console.log("listening on *:3000");
});