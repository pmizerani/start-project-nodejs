const Controller = require("../controllers/testeController");
const jwt = require("../classes/jwt");

module.exports = (app) => {

    app.route("/api/teste")
        .get(Controller.teste);

};