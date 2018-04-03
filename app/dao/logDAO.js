const Model = require('../classes/model');

class LogDAO extends Model {

    /**
     * constructor
     */
    constructor() {
        super('log');
    }

}

module.exports = new LogDAO();