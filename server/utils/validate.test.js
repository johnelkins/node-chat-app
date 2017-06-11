const expect = require('expect');

// import isRealString

// isRealString
// should reject non-string values
// should reject string only spaces
// should allow string with non-space characters

const { isRealString } = require('./validate');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        // test array
        var str = ['Jen'];
        var validate = isRealString(str);

        expect(validate).toBe(false);
    });

    it('should reject string only spaces', () => {
        // test empty string
        var str = '';
        var validate = isRealString(str);

        expect(validate).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        // test array
        var str = 'John';
        var validate = isRealString(str);

        expect(validate).toBe(true);
    });
});