const jwt = require('jwt-simple');
const moment = require('moment');
const SECRET = 'definir-secret';

class JWT {

    /**
     * criar
     * @param usuario
     * @returns {String}
     */
    criar(usuario) {

        const payload = {
            sub: usuario,
            iat: moment().unix(),
            exp: moment().add(3, 'days').unix() //validade em dias do token
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

            req.usuarioAutenticado = payload.sub;
            next();

        } catch (err) {
            res.unauthorized(); 
        }
    }

}

module.exports = new JWT();