const Country = require('../models/country');
const StateProvince = require('../models/state_province');
const City = require('../models/city');

class CountryController {

    /**
     * findAllCountries
     * @param req
     * @param res
     * @method GET
     * route /api/country
     */
    findAllCountries(req, res) {

        Country.find().then(result => {

            res.sendJSON(result);

        }).catch(err =>{
            console.log(err);
            res.internalError(err);
        });

    }//end findAllCountries

    /**
     * findAllStateProvince
     * @param req
     * @param res
     * @method GET
     * route /api/stateprovince/:id_country
     */
    findAllStateProvince(req, res) {

        StateProvince.find({
            id_country:req.params.id_country
        }).then(result => {

            res.sendJSON(result);

        }).catch(err =>{
            console.log(err);
            res.internalError(err);
        });

    }//end findAllStateProvince

    /**
     * findAllCities
     * @param req
     * @param res
     * @method GET
     * route /api/city/:id_state
     */
    findAllCities(req, res) {

        City.find({
            id_state_province:req.params.id_state
        }).then(result => {

            res.sendJSON(result);

        }).catch(err =>{
            console.log(err);
            res.internalError(err);
        });

    }//end findAllCities

}

module.exports = new CountryController();