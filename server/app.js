var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var game = require('./game')

server.listen(80);
// WARNING: app.listen(80) will NOT work here!
console.log('Starting')

app.get('/', function (req, res) {
  console.log('serving index.html')
  res.sendFile(__dirname + '/index.html');
});

var i = 0;
var roomData = {};

// https://github.com/socketio/socket.io/issues/3259#issuecomment-474523271
io.attach(server, {
  pingTimeout: 30000,
});

game(io)