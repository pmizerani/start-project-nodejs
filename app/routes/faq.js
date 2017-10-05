const jwt = require("../classes/jwt");
const FaqController = require("../controllers/faq");

module.exports = (app) => {

    app.route("/api/faq")
        .post(jwt.ensureAuthentication, FaqController.create)
        .get(jwt.ensureAuthentication, FaqController.findAll)
        .put(jwt.ensureAuthentication, FaqController.update);

    app.route("/api/faq/:id")
        .get(jwt.ensureAuthentication, FaqController.findById)
        .delete(jwt.ensureAuthentication, FaqController.delete);

};