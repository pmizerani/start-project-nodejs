const Model = require('../classes/model');

class CityModel extends Model {

    /**
     * constructor
     */
    constructor() {
        super('city');
    }

}

module.exports = new CityModel();