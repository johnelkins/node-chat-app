 var socket = io();

 socket.on('connect', function() {
     console.log('connected');
 });

 socket.on('disconnect', function() {
     console.log('Disconnected from server.');
 });

 socket.on('newMessage', function(message) {
     console.log('New message', message);
     var li = jQuery('<li></li>');
     li.text(`${message.from}: ${message.text}`);

     jQuery('#messages').append(li);
 });

 socket.on('welcomeMessage', function(message) {
     console.log('Welcome message', message);
 });

 socket.on('newUserMessage', function(message) {
     console.log('Message from the Admin', message);
 });

 //  socket.emit('createMessage', {
 //      from: 'Frank',
 //      text: 'Hi'
 //  }, function(data) {
 //      console.log(data);
 //  });

 jQuery('#message-form').on('submit', function(e) {
     e.preventDefault();
     socket.emit('createMessage', {
         from: 'User',
         text: jQuery('[name=message]').val()
     }, function() {

     });
 });

 var locationButton = jQuery('#send-location');

 locationButton.on('click', function() {
     //alert('ifired');
     if (!navigator.geolocation) {
         return alert('Geolocation not supported by your browser.');
     }

     navigator.geolocation.getCurrentPosition(function(position) {
         //console.log(position);
         socket.emit('createLocationMessage', {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude
         })
     }, function() {
         alert('Unable to fetch location.');
     });
 });