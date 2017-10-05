const AuthController = require("../controllers/auth");
const jwt = require("../classes/jwt");

module.exports = (app) => {

    app.route("/api/auth")
        .post(AuthController.auth);

    app.route("/api/auth/admin")
        .post(AuthController.authAdmin);

};