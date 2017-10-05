const jwt = require("../classes/jwt");
const RLUserController = require("../controllers/rl_user");

module.exports = (app) => {

    app.route("/api/uservisit")
        .post(jwt.ensureAuthentication, RLUserController.createVisit);
    app.route("/api/uservisit/:id_visited_user")
        .get(jwt.ensureAuthentication, RLUserController.findByVisitedUser);

    app.route("/api/userfavorite")
        .post(jwt.ensureAuthentication, RLUserController.createFavorite);
    app.route("/api/userfavorite/:id_favorite_user")
        .get(jwt.ensureAuthentication, RLUserController.findByFavoriteUser);
    app.route("/api/userfavorite/user/:id_user")
        .get(jwt.ensureAuthentication, RLUserController.findAllFavorite);
    app.route("/api/userfavorite/:id_user/:id_favorite_user")
        .delete(jwt.ensureAuthentication, RLUserController.deleteFavorite);

    app.route("/api/userlike")
        .post(jwt.ensureAuthentication, RLUserController.createLike);
    app.route("/api/userlike/:id_liked_user")
        .get(jwt.ensureAuthentication, RLUserController.findByLikedUser);
    app.route("/api/userlike/user/:id_user")
        .get(jwt.ensureAuthentication, RLUserController.findAllLiked);
    app.route("/api/userlike/:id_user/:id_liked_user")
        .delete(jwt.ensureAuthentication, RLUserController.deleteLiked);

};