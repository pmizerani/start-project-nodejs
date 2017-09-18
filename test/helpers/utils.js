const assert = require('assert');
const utils = require('../../app/helpers/utils');

describe('Helper `utils`', () => {

    describe('Encrypt', () => {
    
        it('should encrypt', () => {
            const expect = '7f9f4afbd3f0';
            assert.equal(utils.encrypt('abcdef'), expect);
        });
    
    });

});