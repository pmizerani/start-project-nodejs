const Model = require('../classes/model');

class UserNotificationModel extends Model {

    /**
     * constructor
     */
    constructor() {
        super('user_notification');
    }

}

module.exports = new UserNotificationModel();