 var socket = io();

 socket.on('connect', function() {
     console.log('connected');

     socket.emit('createMessage', {
         to: 'User 2',
         text: 'Hey. This is user 2.'
     })
 });

 socket.on('disconnect', function() {
     console.log('Disconnected from server.');
 });

 socket.on('newMessage', function(message) {
     console.log('New message', message);
 });