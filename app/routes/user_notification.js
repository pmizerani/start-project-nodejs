const jwt = require("../classes/jwt");
const UserNotificationController = require("../controllers/user_notification");

module.exports = (app) => {

    app.route("/api/usernotification")
        .post(jwt.ensureAuthentication, UserNotificationController.create)
        .put(jwt.ensureAuthentication, UserNotificationController.update);

    app.route("/api/usernotification/:id_user/:status?")
        .get(jwt.ensureAuthentication, UserNotificationController.findByUser);

    app.route("/api/usernotification/:id")
        .delete(jwt.ensureAuthentication, UserNotificationController.delete)
};