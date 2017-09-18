const assert = require('assert');
const cors = require ('../../app/middlewares/cors');

describe('Middleware `cors`', () => {
    it('Should set CORS header to all responses', () => {

        const resMock = {
            _values: [],
            setHeader: function(name, value) {
                this._values.push({ name, value })
            }
        };

        cors({}, resMock, () => {
            
            const expectedValue = [{
                name: "Access-Control-Allow-Origin",
                value: "*"
            }, {
                name: "Access-Control-Allow-Credentials",
                value: true
            }];

            assert.deepEqual(resMock._values, expectedValue, "Headers are different then expected");

        });

    });
});