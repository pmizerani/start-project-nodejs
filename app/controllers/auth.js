const User = require('../models/user');
const valid = require('../helpers/validation');
const encrypt = require('../helpers/utils').encrypt;
const jwt = require('../classes/jwt');

class AuthController {

    /**
     * auth
     * @param req
     * @param res
     * @method POST
     * route /api/auth
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

        User.findByUserCredentials({
            email, password: encrypt(password)
        }).then(result => {

            const logged = result.length > 0;

            if ( ! logged) {
                res.unauthorized();
                return;
            }
            
            const user = result[0];
            const token = jwt.create(user);
            // res.set('Authorization', 'Bearer ' + token);
            res.sendJSON({ token });

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end auth

    /**
     * authAdmin
     * @param req
     * @param res
     * @method POST
     * route /api/auth/admin
     */
    authAdmin(req, res) {

        const errors = [];
        const { email, password } = req.body || {};

        if ( ! valid.email(email)) errors.push('E-mail address is not valid');
        if ( ! password) errors.push('Password is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        User.findByUserCredentialsAdmin({
            email, password: encrypt(password)
        }).then(result => {

            const logged = result.length > 0;

            if ( ! logged) {
                res.unauthorized();
                return;
            }

            const user = result[0];
            const token = jwt.create(user);
            // res.set('Authorization', 'Bearer ' + token);
            res.sendJSON({ token });

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end authAdmin

}

module.exports = new AuthController();