const Model = require('../classes/model');

class FaqModel extends Model {

    /**
     * constructor
     */
    constructor() {
        super('faq');
    }

}

module.exports = new FaqModel();