const Faq = require('../models/faq');

class FaqController {

    /**
     * create
     * @param req
     * @param res
     * @method POST
     * route /api/faq
     */
    create(req, res) {

        const errors = [];
        const { title, message } = req.body || {};

        //Check mandatory fields
        if (!title) errors.push('Title is required');
        if (!message) errors.push('Message is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        //Create new faq
        Faq.insert({title, message}).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end create

    /**
     * findAll
     * @param req
     * @param res
     * @method GET
     * route /api/faq
     */
    findAll(req, res) {

        //Find all faq's
        Faq.find().then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    };

    /**
     * findById
     * @param req
     * @param res
     * @method GET
     * route /api/faq/:id
     */
    findById(req, res) {

        const errors = [];
        const {id} = req.params || {};

        //Check mandatory fields
        if (!id) errors.push('ID is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        //Find faq by id
        Faq.find({id}).then(result => {

            res.sendJSON(result[0]);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end findById

    /**
     * delete
     * @param req
     * @param res
     * @method DELETE
     * route /api/faq/:id
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

        Faq.delete({id}).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end delete

    /**
     * update
     * @param req
     * @param res
     * @method PUT
     * route /api/faq
     */
    update(req, res) {

        const errors = [];
        const { id, title, message } = req.body || {};

        //Check mandatory fields
        if (!id) errors.push('ID is required');
        if (!title) errors.push('Title is required');
        if (!message) errors.push('Message is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        //Update user
        Faq.update({ id, title, message }, {
            id
        }).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end update

}

module.exports = new FaqController();