var debug = require('debug')('game:socket');

var roomData = {};
// io.on('connection', function (socket) {

var game = function(io) {
    io.on('connection', (socket) => {

        console.log('connection!!')

        socket.on('createRoom', function() {
            console.log('createRoom');
            var roomName = generateRandomString(5)
            var gameData = {
                roomName: roomName,
                count: 1
            }; 
            roomData[roomName] = gameData;
            socket.join(roomName);
            console.log(roomData[roomName]);
            io.to(roomName).emit('gameData', roomData[roomName]);
        })
        socket.on('joinRoom', function(roomName) {
            console.log('joinRoom');
            socket.join(roomName);
            console.log(roomData[roomName]);
            io.to(roomName).emit('gameData', roomData[roomName]);
        })
        socket.on('increment', function(roomName, step) {
            console.log('increment');
            roomData[roomName].count = roomData[roomName].count + step
            console.log(roomData[roomName]);
            io.to(roomName).emit('gameData', roomData[roomName]);
        })
    })
}

generateRandomString = function(len) {
    return Math.random().toString(36).substr(2, len).toUpperCase();
}
module.exports = game;