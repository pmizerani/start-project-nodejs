const jwt = require('jwt-simple');
const moment = require('moment');
const SECRET = 'f387fr84743f20f80f86f662f62';
const encrypt = require('../helpers/utils').encrypt;
const decrypt = require('../helpers/utils').decrypt;

class JWT {

    /**
     * create
     * @param user
     * @returns {String}
     */
    create(user) {
        const payload = {
            sub: user,
            iat: moment().unix(),
            exp: moment().add(3, 'days').unix()
        };

        return jwt.encode(payload, SECRET);
    }

    /**
     * ensureAuthentication
     * @param req
     * @param res
     * @param next
     */
    ensureAuthentication(req, res, next) {
        if ( ! req.header('Authorization')) {
            res.unauthorized();
            return;
        }

        const token = req.header('Authorization').split(' ')[1];
        
        try {

            const payload = jwt.decode(token, SECRET);
            if (payload.exp <= moment().unix()) {
                res.unauthorized('Token expired');
                return;
            }

            req.authenticatedUser = payload.sub;
            next();

        } catch (err) {
            res.unauthorized(); 
        }
    }

    /**
     * ensureAuth
     * @param req
     * @param res
     * @param next
     */
    ensureAuth(req, res, next) {

        if ( ! req.header('Authorization')) {
            res.unauthorized();
            return;
        }

        const token = req.header('Authorization');

        try {

            const decryptedToken = decrypt(token);

            if('as2f1as5d1fasdff_ovulo_doacao_token_asdfa2sd2f1a2sd1f' !== decryptedToken) {
                res.unauthorized();
                return;
            }

            next();

        } catch (err) {
            res.unauthorized();
        }
    }
}

module.exports = new JWT();