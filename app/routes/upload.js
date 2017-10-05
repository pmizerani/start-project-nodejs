const UploadController = require("../controllers/upload");
const jwt = require("../classes/jwt");

module.exports = (app) => {

    app.route("/api/upload")
        .post(jwt.ensureAuth, UploadController.upload);

};