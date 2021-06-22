var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(client) {
    
    client.on('disconnect', function() {
        console.log("disconnected")
    });

    client.on('room', function(data) {
        client.join(data.roomId);
        console.log(' Client joined the room and client id is '+ client.id);
    });

    client.on('toBackEnd', function(data) {
        client.in(data.roomId).emit('message', data);
    })
});

server.listen(process.env.PORT || 3000);