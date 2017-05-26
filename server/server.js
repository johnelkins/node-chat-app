const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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



    socket.on('createMessage', (message) => {
        console.log('newMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

server.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = { app };