//Unix epoch: Jan 1st 1970 00:00:00 am UTC
//stored as ms

const moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
// date.add(1, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));


// 10:35 am
var createdAt = 1234;
var date = new moment(createdAt).format('h:mm a');
console.log(date);

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);