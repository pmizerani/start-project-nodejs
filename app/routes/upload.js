const UploadController = require("../controllers/uploadController");
const jwt = require("../classes/jwt");

module.exports = (app) => {

    app.route("/api/upload")
        .post(jwt.ensureAuthentication, UploadController.upload);

};