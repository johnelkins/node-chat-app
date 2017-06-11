 var socket = io();

 function scrollToBottom() {
     //Selectors
     var messages = jQuery('#messages');
     var newMessage = messages.children('li:last-child');
     //Heights
     var clientHeight = messages.prop('clientHeight');
     var scrollTop = messages.prop('scrollTop');
     var scrollHeight = messages.prop('scrollHeight');
     var newMessageHeight = newMessage.innerHeight();
     var lastMessageHeight = newMessage.prev().innerHeight();


     if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
         messages.scrollTop(scrollHeight);
     }
 }

 socket.on('connect', function() {
     console.log('Connected to server');
     var params = $.deparam(window.location.search);

     socket.emit('join', params, function(err) {
         if (err) {
             alert(err);
             window.location.href = '/';
         } else {
             console.log('No error');
         }
     });
 });

 socket.on('disconnect', function() {
     console.log('Disconnected from server.');
 });

 socket.on('updateUserList', function(users) {
     var ol = $('<ol></ol>');

     users.forEach(function(user) {
         ol.append($('<li></li>').text(user));
     });

     $('#users').html(ol);
 });

 socket.on('newMessage', function(message) {
     var formattedTime = moment(message.createdAt).format('h:mm a');
     var template = $('#message-template').html();
     var html = Mustache.render(template, {
         text: message.text,
         from: message.from,
         createdAt: formattedTime
     });

     jQuery('#messages').append(html);
     scrollToBottom();

     // THIS IS WHAT YOU WANT TO AVOID DOING FROM NOW ON.. ADDING ELEMENTS VIA jQUERY... USE TEMPLATES!
     //  console.log('New message', message);
     //  var li = jQuery('<li></li>');
     //  li.text(`${message.from} ${formattedTime}: ${message.text}`);
     //  jQuery('#messages').append(li);
 });

 socket.on('welcomeMessage', function(message) {
     console.log('Welcome message', message);
 });

 //  socket.on('newUserMessage', function(message) {
 //      console.log('Message from the Admin', message);
 //  });

 socket.on('newLocationMessage', function(message) {
     var formattedTime = moment(message.createdAt).format('h:mm a');
     var template = $('#location-message-template').html();
     var html = Mustache.render(template, {
         from: message.from,
         url: message.url,
         createdAt: formattedTime
     });

     jQuery('#messages').append(html);
     scrollToBottom();

     // THIS IS WHAT YOU WANT TO AVOID DOING FROM NOW ON.. ADDING ELEMENTS VIA jQUERY... USE TEMPLATES!
     //  var formattedTime = moment(message.createdAt).format('h:mm a');
     //  var li = jQuery('<li></li>');
     //  var a = jQuery('<a target="_blank">My current location</a>')
     //  li.text(`${message.from} ${formattedTime}: `);
     //  a.attr('href', message.url);
     //  li.append(a);
     //  jQuery('#messages').append(li);
 });

 //  socket.emit('createMessage', {
 //      from: 'Frank',
 //      text: 'Hi'
 //  }, function(data) {
 //      console.log(data);
 //  });

 $('#message-form').on('submit', function(e) {
     e.preventDefault();
     var messageTextBox = $('[name=message]');
     socket.emit('createMessage', {
         text: messageTextBox.val()
     }, function() {
         messageTextBox.val('');
     });
 });

 var locationButton = $('#send-location');

 locationButton.on('click', function() {
     //alert('ifired');
     if (!navigator.geolocation) {
         return alert('Geolocation not supported by your browser.');
     }

     locationButton.attr('disabled', 'disabled').text('Sending location');

     navigator.geolocation.getCurrentPosition(function(position) {
         //console.log(position);
         socket.emit('createLocationMessage', {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude
         });
         locationButton.removeAttr('disabled').text('Send Location');
     }, function() {
         alert('Unable to fetch location.');
         locationButton.removeAttr('disabled').text('Send Location');
     });
 });