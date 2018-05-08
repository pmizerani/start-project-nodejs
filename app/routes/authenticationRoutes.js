const Controller = require("../controllers/authenticationController");
const jwt = require("../classes/jwt");

module.exports = (app) => {

    app.route("/api/autenticacao")
        .post(Controller.autenticacao);

	app.route("/api/validartoken")
        .get(jwt.ensureAuthentication, Controller.validarToken);

};