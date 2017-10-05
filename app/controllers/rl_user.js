const RLUserVisit = require('../models/rl_user_visit');
const RLUserFavorite = require('../models/rl_user_favorite');
const RLUserLike = require('../models/rl_user_like');
const moment = require("moment");

class RLUserController {

    /**
     * createVisit
     * @param req
     * @param res
     * @method POST
     * route /api/uservisit
     */
    createVisit(req, res) {

        const errors = [];
        let { id_visited_user, id_visitor_user, visit_date } = req.body || {};

        //Check mandatory fields
        if (!id_visited_user) errors.push('ID Visited User is required');
        if (!id_visitor_user) errors.push('ID Visitor User is required');
        if (!visit_date) errors.push('Visit Date is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        //Format date to YYYY-MM-DD
        visit_date = moment(visit_date).format("YYYY-MM-DD");

        RLUserVisit.insert({ id_visited_user, id_visitor_user, visit_date }).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end createVisit

    /**
     * createFavorite
     * @param req
     * @param res
     * @method POST
     * route /api/userfavorite
     */
    createFavorite(req, res) {

        const errors = [];
        let { id_user, id_favorite_user } = req.body || {};

        //Check mandatory fields
        if (!id_user) errors.push('ID User is required');
        if (!id_favorite_user) errors.push('ID Favorite User is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        RLUserFavorite.insert({ id_user, id_favorite_user }).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end createFavorite

    /**
     * createLike
     * @param req
     * @param res
     * @method POST
     * route /api/userlike
     */
    createLike(req, res) {

        const errors = [];
        let { id_user, id_liked_user } = req.body || {};

        //Check mandatory fields
        if (!id_user) errors.push('ID User is required');
        if (!id_liked_user) errors.push('ID Liked User is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        RLUserLike.insert({ id_user, id_liked_user }).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end createLike

    /**
     * findByVisitedUser
     * @param req
     * @param res
     * @method GET
     * route /api/uservisit/:id_visited_user
     */
    findByVisitedUser(req, res) {

        const errors = [];
        let { id_visited_user } = req.params || {};

        //Check mandatory fields
        if (!id_visited_user) errors.push('ID Visited User is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        RLUserVisit.findByVisitedUser({ id_visited_user }).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    };//end findByVisitedUser

    /**
     * findByFavoriteUser
     * @param req
     * @param res
     * @method GET
     * route /api/userfavorite/:id_favorite_user
     */
    findByFavoriteUser(req, res) {

        const errors = [];
        let { id_favorite_user } = req.params || {};

        //Check mandatory fields
        if (!id_favorite_user) errors.push('ID Favorite User is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        RLUserFavorite.findByFavoriteUser({ id_favorite_user }).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    };//end findByFavoriteUser

    /**
     * findByLikedUser
     * @param req
     * @param res
     * @method GET
     * route /api/userlike/:id_liked_user
     */
    findByLikedUser(req, res) {

        const errors = [];
        let { id_liked_user } = req.params || {};

        //Check mandatory fields
        if (!id_liked_user) errors.push('ID Liked User is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        RLUserLike.findByLikedUser({ id_liked_user }).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    };//end findByLikedUser

    /**
     * findAllFavorite
     * @param req
     * @param res
     * @method GET
     * route /api/userfavorite/user/:id_user
     */
    findAllFavorite(req, res) {

        const errors = [];
        let { id_user } = req.params || {};

        //Check mandatory fields
        if (!id_user) errors.push('ID User is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        RLUserFavorite.findAllFavorite({ id_user }).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    };//end findAllFavorite

    /**
     * findAllLiked
     * @param req
     * @param res
     * @method GET
     * route /api/userlike/user/:id_user
     */
    findAllLiked(req, res) {

        const errors = [];
        let { id_user } = req.params || {};

        //Check mandatory fields
        if (!id_user) errors.push('ID User is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        RLUserLike.findAllLiked({ id_user }).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    };//end findAllLiked

    /**
     * deleteFavorite
     * @param req
     * @param res
     * @method DELETE
     * route /api/userfavorite/:id_user/:id_favorite_user
     */
    deleteFavorite(req, res) {

        const errors = [];
        let { id_user, id_favorite_user } = req.params || {};

        //Check mandatory fields
        if (!id_user) errors.push('ID User is required');
        if (!id_favorite_user) errors.push('ID Favorite User is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        RLUserFavorite.delete({ id_user, id_favorite_user }).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    };//end deleteFavorite

    /**
     * deleteLiked
     * @param req
     * @param res
     * @method DELETE
     * route /api/userlike/:id_user/:id_liked_user
     */
    deleteLiked(req, res) {

        const errors = [];
        let { id_user, id_liked_user } = req.params || {};

        //Check mandatory fields
        if (!id_user) errors.push('ID User is required');
        if (!id_liked_user) errors.push('ID Liked User is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        RLUserLike.delete({ id_user, id_liked_user }).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    };//end deleteLiked

}

module.exports = new RLUserController();