const Auth = require('../controllers/auth');

module.exports = (app) => {

    app.route("/auth")
        .post(Auth.auth);

    app.route("/auth_with_hash")
        .post(Auth.authWithHash);

    app.route("/example")
        .get(Auth.example);

    // app.route("/videos/:id_customer_plans")
    //     .get(jwt.ensureAuthentication, CustomerPlansVideos.list);

};