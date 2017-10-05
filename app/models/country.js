const Model = require('../classes/model');

class CountryModel extends Model {

    /**
     * constructor
     */
    constructor() {
        super('country');
    }

}

module.exports = new CountryModel();