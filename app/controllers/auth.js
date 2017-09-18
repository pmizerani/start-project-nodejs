const Users = require('../models/users');
const valid = require('../helpers/validation');
const encrypt = require('../helpers/utils').encrypt;
const jwt = require('../classes/jwt');

class Auth {

    /**
     * auth
     * @param req
     * @param res
     * @method POST
     * route /auth
     */
    auth(req, res) {

        const errors = [];
        const { email, password } = req.body || {};

        if ( ! valid.email(email)) errors.push('E-mail address is not valid');
        if ( ! password) errors.push('Password is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        Users.findByUserCredentials({
            email, password: encrypt(password)
        }).then(result => {

            const logged = result.length > 0;

            if ( ! logged) {
                res.unauthorized();
                return;
            }
            
            const user = result[0];
            const token = jwt.create(user);
            res.sendJSON({ token });

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end auth

    /**
     * authWithHash
     * @param req
     * @param res
     * @method POST
     * route /auth_with_hash
     */
    authWithHash(req, res) {
        const { hash } = req.body || {};

        if ( ! hash) {
            res.badRequest('Hash is required');
            return;
        }

        Users.findByCustomerHash(hash).then(result => {

            const logged = result.length > 0;
            
            if ( ! logged) {
                res.unauthorized();
                return;
            }

            const user = result[0];
            const token = jwt.create(user);
            res.sendJSON({ token });

        }).catch(err => {
            console.log(err);
            res.internalError();
        });

    }//end authWithHash

    /**
     * example
     * @param req
     * @param res
     * @method GET
     * route /example
     */
    example(req, res) {

        let dataResponse = {
            status: 200,
            message: "Route example",
            data: []
        }

        res.sendJSON(dataResponse);

    }//end example
}

module.exports = new Auth();