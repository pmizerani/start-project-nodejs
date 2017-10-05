const jwt = require("../classes/jwt");
const UserController = require("../controllers/user");

module.exports = (app) => {

    app.route("/api/user")
        .post(jwt.ensureAuth, UserController.create)
        .put(jwt.ensureAuthentication, UserController.update)
        .get(jwt.ensureAuthentication, UserController.findAll);

    app.route("/api/checkemail/:email")
        .get(jwt.ensureAuth, UserController.checkEmail);

    app.route("/api/user/:id")
        .get(jwt.ensureAuthentication, UserController.findById)
        .delete(jwt.ensureAuthentication, UserController.delete);

};