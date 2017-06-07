const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

// console.log(__dirname + '/../public');
// console.log(publicPath);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    //socket.emit from admin text welcom to chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

    //socket.broadcast.emit from admin text new user joined
    socket.broadcast.emit('newUserMessage', generateMessage('Admin', 'New user joined the chat!'))

    socket.on('createMessage', (message, callback) => {
        console.log('newMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        console.log(coords);
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = { app };