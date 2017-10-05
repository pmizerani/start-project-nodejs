const User = require('../models/user');
const UserInformation = require('../models/user_information');
const valid = require('../helpers/validation');
const encrypt = require('../helpers/utils').encrypt;
const decrypt = require('../helpers/utils').decrypt;
const jwt = require('../classes/jwt');
const moment = require("moment");

class UserController {

    /**
     * create
     * @param req
     * @param res
     * @method POST
     * route /api/user
     */
    create(req, res) {

        const errors = [];
        const data = {
            birthdate: moment(req.body.birthdate).format("YYYY-MM-DD"),
            cpf: req.body.cpf,
            created_date: moment().format("YYYY-MM-DD"),
            email: req.body.email,
            id_city: req.body.id_city,
            id_facebook: req.body.id_facebook,
            name: req.body.name,
            password: req.body.password,
            phone: req.body.phone,
            photo: req.body.photo,
            profile: req.body.profile,
            newsletter_terms: req.body.newsletter_terms

        };

        //Check mandatory fields
        if (!data.name) errors.push('Name is required');
        if (!valid.email(data.email)) errors.push('E-mail address is not valid');
        if (!data.password) errors.push('Password is required');
        if (!data.profile) errors.push('Profile is required');
        if (!data.newsletter_terms) errors.push('Newsletter Terms is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        //Encrypt password
        data.password = encrypt(data.password);

        //Create new user
        User.insert(data).then(resultUser => {

            //Create empty register of user information
            UserInformation.insert({id_user: resultUser[0]}).then(result => {

                data.id = resultUser[0];
                const token = jwt.create(data);
                res.sendJSON({token});

            }).catch(err => {
                console.log(err);
                res.internalError(err);
            });

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end create

    /**
     * checkEmail
     * @param req
     * @param res
     * @method GET
     * route /api/checkemail/:email
     */
    checkEmail(req, res) {

        const errors = [];
        const {email} = req.params || {};

        //Check mandatory fields
        if (!valid.email(email)) errors.push('E-mail address is not valid');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        //Find user by email
        User.find({email}).then(result => {

            res.sendJSON(result[0]);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end checkEmail

    /**
     * findById
     * @param req
     * @param res
     * @method GET
     * route /api/user/:id
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

        //Find user by id
        User.findByID({id}).then(result => {

            if (0 < result.length) result[0].password = decrypt(result[0].password);
            res.sendJSON(result[0]);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end findById

    /**
     * findAll
     * @param req
     * @param res
     * @method GET
     * route /api/user
     */
    findAll(req, res) {

        //Find user by id
        User.find({}).then(result => {

            res.sendJSON(result);

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    };//end findAll

    /**
     * delete
     * @param req
     * @param res
     * @method DELETE
     * route /api/user/:id
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

        //Find user by id
        User.delete({id}).then(result => {

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
     * route /api/user
     */
    update(req, res) {

        const errors = [];
        const data = {
            id: req.body.id,
            birthdate: moment(req.body.birthdate).format("YYYY-MM-DD"),
            cpf: req.body.cpf,
            created_date: moment().format("YYYY-MM-DD"),
            email: req.body.email,
            id_city: req.body.id_city,
            id_facebook: req.body.id_facebook,
            name: req.body.name,
            password: req.body.password,
            phone: req.body.phone,
            photo: req.body.photo,
            profile: req.body.profile,
            newsletter_terms: req.body.newsletter_terms
        };

        const dataInformation = req.body.user_information ? req.body.user_information : {id_user: data.id};

        //Check mandatory fields
        if (!data.id) errors.push('ID is required');
        if (!data.name) errors.push('Name is required');
        if (!valid.email(data.email)) errors.push('E-mail address is not valid');
        if (!data.password) errors.push('Password is required');
        if (!data.profile) errors.push('Profile is required');
        if (!data.newsletter_terms) errors.push('Newsletter Terms is required');
        if (!req.body.user_information) errors.push('User Information is required');

        if (errors.length > 0) {
            res.badRequest(errors.join('\n'));
            return;
        }

        data.password = encrypt(data.password);

        //Update user
        User.update(data, {
            id: data.id
        }).then(resultUser => {

            //Update User information
            UserInformation.update(dataInformation, {
                id_user: data.id
            }).then(result => {

                //Update token
                const token = jwt.create(data);
                res.sendJSON({token});

            }).catch(err => {
                console.log(err);
                res.internalError(err);
            });

        }).catch(err => {
            console.log(err);
            res.internalError(err);
        });

    }//end update

}

module.exports = new UserController();