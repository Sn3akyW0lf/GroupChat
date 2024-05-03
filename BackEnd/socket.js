const socketio = require('socket.io');
const http = require('http');
const formatMessage = require('./util/message');
const server = http.createServer(require('./app'));
const io = socketio(server, {
    cors: {
        origin: 'null'
    }
});
const botName = 'Chat Bot';

io.on('connection', socket => {
    console.log('Client Connected');

    socket.emit('message', formatMessage(botName, 'Welcome to the Chat App'));

    socket.on('disconnect', () => {
        console.log('Client Disconnected');
    });
});

module.exports = io;