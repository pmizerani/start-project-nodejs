const jwt = require('../../app/classes/jwt');
const jwtSimple = require('jwt-simple');
const moment = require('moment');
const assert = require('assert');

describe('Class `jwt`', () => {

    const mockUser = {
        id: 123,
        name: 'test'
    };

    it('should create jwt token', () => {
        const token = jwt.create(mockUser);
        assert.ok(typeof(token) === "string" && token.length > 30);
    });

    it('should authenticate if authentication is valid', done => {
        const token = jwt.create(mockUser);
        const header = 'Authorization: Bearer ' + token;

        const reqMock = {
            header: function(key) {
                return 'Bearer ' + token;
            }
        };

        jwt.ensureAuthentication(reqMock, {}, () => {
            done();
        });
    });

    it('should show unauthorized if authentication is invalid', done => {

        const reqMock = {
            header: function(key) {
                return 'Authorization: Bearer iNVaLi4dToKen';
            }
        };

        const resMock = {
            unauthorized: function() {
                done();
            }
        }

        jwt.ensureAuthentication(reqMock, resMock);
    });

    it('should show unauthorized if authentication is expired', done => {

        const SECRET = 'f387fr84743f20f80f86f662f62';

        const payload = {
            sub: { id: 123, name: 'test' },
            iat: moment().unix(),
            exp: moment().subtract(3, 'days').unix()
        };

        const expiredToken = jwtSimple.encode(payload, SECRET);

        const reqMock = {
            header: function(key) {
                return 'Authorization: Bearer ' + expiredToken;
            }
        };

        const resMock = {
            unauthorized: function() {
                done();
            }
        }

        jwt.ensureAuthentication(reqMock, resMock);

    });

});