const Controller = require("../controllers/uploadController");
const jwt = require("../classes/jwt");

module.exports = (app) => {

    app.route("/api/upload")
        .post(jwt.ensureAuthentication, Controller.upload);

    app.route("/api/upload/:arquivo")
        .delete(jwt.ensureAuthentication, Controller.excluir);

};