const assert = require('assert');
const output = require('../../app/middlewares/output');

describe('Middleware `output`', () => {

    it('should define method `badRequest` to response', () => {
        const resMock = {};
        output({}, resMock, () => {
            const hasMethod = 'badRequest' in resMock;
            assert.ok(hasMethod, 'Method `badRequest` was not created on response');
        });
    });

    it('should define method `unauthorized` to response', () => {
        const resMock = {};
        output({}, resMock, () => {
            const hasMethod = 'unauthorized' in resMock;
            assert.ok(hasMethod, 'Method `unauthorized` was not created on response');
        });
    });

    it('should define method `internalError` to response', () => {
        const resMock = {};
        output({}, resMock, () => {
            const hasMethod = 'internalError' in resMock;
            assert.ok(hasMethod, 'Method `internalError` was not created on response');
        });
    });

    it('should define method `sendJSON` to response', () => {
        const resMock = {};
        output({}, resMock, () => {
            const hasMethod = 'sendJSON' in resMock;
            assert.ok(hasMethod, 'Method `sendJSON` was not created on response');
        });
    });

    describe('Methods', () => {

        let resMock = null;
        
        beforeEach(() => {
            resMock = {
                _status: 0,
                _sent: false,
                _sentMessage: null,
                _header: null,
                status: function(code) {
                    this._status = code;
                    return this;
                },
                setHeader: function(name, value) {
                    this._header = { name, value };
                },
                send: function(message) {
                    this._sent = true;
                    this._sentMessage = message;
                    return this;
                }
            }
        });

        describe('badRequest', () => {

            it('should return header status 400', () => {
                output({}, resMock, () => {
                    resMock.badRequest();
                    assert.equal(resMock._status, 400, 'Status code is not 400');
                });
            });

            it('should be sent', () => {
                output({}, resMock, () => {
                    resMock.badRequest();
                    assert.ok(resMock._sent);
                });
            });

        });

        describe('unauthorized', () => {
            
            it('should return header status 401', () => {
                output({}, resMock, () => {
                    resMock.unauthorized();
                    assert.equal(resMock._status, 401, 'Status code is not 401');
                });
            });

            it('should be sent', () => {
                output({}, resMock, () => {
                    resMock.unauthorized();
                    assert.ok(resMock._sent);
                });
            });

        });

        describe('internalError', () => {
            
            it('should return header status 500', () => {
                output({}, resMock, () => {
                    resMock.internalError();
                    assert.equal(resMock._status, 500, 'Status code is not 500');
                });
            });

            it('should be sent', () => {
                output({}, resMock, () => {
                    resMock.internalError();
                    assert.ok(resMock._sent);
                });
            });

        });

        describe('sendJSON', () => {
            
            it('should change header to type json', () => {
                output({}, resMock, () => {
                    resMock.sendJSON({ a: '1' });
                    const expect = { name:'Content-Type', value: 'application/json' };
                    assert.deepEqual(resMock._header, expect, 'header does not have type json');
                });
            });

            it('should send stringified json', () => {
                output({}, resMock, () => {
                    const obj = { a: 1 };
                    const expect = JSON.stringify(obj);
                    resMock.sendJSON(obj)

                    assert.deepStrictEqual(resMock._sentMessage, expect);
                });
            });

        });

    });

});