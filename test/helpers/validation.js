const assert = require('assert');
const validation = require('../../app/helpers/validation');

describe('Helper `validation`', () => {

    describe('email', () => {
    
        it('should return false when input is empty', () => {
            const value = '';
            assert.equal(validation.email(value), false);
        });

        it('should return false when input is invalid mail', () => {
            const value = 'google.com';
            assert.equal(validation.email(value), false);
        });

        it('should return true when input is a valid email', () => {
            const value = 'myemail@email.com';
            assert.equal(validation.email(value), true);
        });
    
    });

});