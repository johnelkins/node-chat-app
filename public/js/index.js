 var socket = io();

 socket.on('connect', function() {
     console.log('connected');
 });

 socket.on('disconnect', function() {
     console.log('Disconnected from server.');
 });

 socket.on('newMessage', function(message) {
     console.log('New message', message);
 });

 socket.on('welcomeMessage', function(message) {
     console.log('Welcome message', message);
 });

 socket.on('newUserMessage', function(message) {
     console.log('Message from the Admin', message);
 });