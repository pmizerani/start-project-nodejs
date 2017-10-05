const UserNotification = require('../models/user_notification');
const moment = require("moment");

class UserNotificationController {

    /**
     * create
     * @param req
     * @param res
     * @method POST
     * route /api/usernotification
     */
    create(req, res) {

        const errors = [];
        const data = {
            id_user: req.body.id_user,
            created_date: moment().format("YYYY-MM-DD"),
            message: req.body.message,
            status: 0
        };

        //Check mandatory fields
        if (!data.id_user) errors.push('ID User is required');
        if (!data.message) errors.push('Message is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        UserNotification.insert(data).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end create

    /**
     * update
     * @param req
     * @param res
     * @method PUT
     * route /api/usernotification
     */
    update(req, res) {

        const errors = [];
        const data = {
            id: req.body.id,
            view_date: moment(req.body.view_date).format("YYYY-MM-DD")
        };

        //Check mandatory fields
        if (!data.id) errors.push('ID is required');
        if (!data.view_date) errors.push('View Date is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        UserNotification.update(data, {
            id: data.id
        }).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    };//end update

    /**
     * findByUser
     * @param req
     * @param res
     * @method GET
     * route /api/usernotification/:id_user/:status?
     */
    findByUser(req, res) {

        const errors = [];
        const {id_user} = req.params || {};
        let where = {};

        //Check mandatory fields
        if (!id_user) errors.push('ID User is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        if(req.params.status) {
            where.status = req.params.status;
            where.id_user = id_user;
        } else {
            where.id_user = id_user;
        }

        UserNotification.find(where, 'created_date', 'desc').then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end findByUser

    /**
     * delete
     * @param req
     * @param res
     * @method DELETE
     * route /api/usernotification/:id
     */
    delete(req, res) {

        const errors = [];
        const {id} = req.params || {};

        //Check mandatory fields
        if (!id) errors.push('ID is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        UserNotification.delete({id}).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end delete

}

module.exports = new UserNotificationController();