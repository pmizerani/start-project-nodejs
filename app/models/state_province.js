const Model = require('../classes/model');

class StateProvinceModel extends Model {

    /**
     * constructor
     */
    constructor() {
        super('state_province');
    }

}

module.exports = new StateProvinceModel();