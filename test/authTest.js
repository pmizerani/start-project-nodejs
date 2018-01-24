const AuthController = require('../app/controllers/auth');

describe('Auth', () => {

	let id = '1';

	/**
	 * Test auth
	 */
	it('should authenticate', (done, fail) => {

		const resMock = {
			internalError(data) {
				console.log(data);
				return this;
			},
			sendJSON(data) {
				if(data) {
					done();
				}
				else fail();
			}
		};

		const reqMock = {
			body: {
				email: 'admin@odyn.com',
				password: 'senha'
			}
		};

		AuthController.auth(reqMock, resMock);

	});

});