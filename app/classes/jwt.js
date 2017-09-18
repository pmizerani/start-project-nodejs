const jwt = require('jwt-simple');
const moment = require('moment');
const SECRET = 'f387fr84743f20f80f86f662f62';

class JWT {

    create(user) {
        const payload = {
            sub: user,
            iat: moment().unix(),
            exp: moment().add(3, 'days').unix()
        };

        return jwt.encode(payload, SECRET);
    }

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
}

module.exports = new JWT();