const Model = require('../classes/model');

class UserInformationModel extends Model {

    /**
     * constructor
     */
    constructor() {
        super('user_information');
    }

}

module.exports = new UserInformationModel();