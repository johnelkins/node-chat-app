var expect = require('expect');

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // store res in variable 
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
        // assert from match
        // assert text match
        // assert createdAt is number
    })
});

describe('generate location message', () => {
    it('should generate correct location object', () => {
        // store res in variable 
        var from = 'Admin';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15,19'
        var message = generateLocationMessage(from, latitude, longitude);
        // console.log(message);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            url
        });
        // assert from match
        // assert text match
        // assert createdAt is number
    });
});