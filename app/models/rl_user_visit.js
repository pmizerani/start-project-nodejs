const Model = require('../classes/model');

class RLUserVisitModel extends Model {

    /**
     * constructor
     */
    constructor() {
        super('rl_user_visit');
    }

    findByVisitedUser({ id_visited_user }) {
        return this.db.select([
            'rl_user_visit.visit_date',
            'user.*'
        ]).from('rl_user_visit')
            .innerJoin('user', 'user.id', 'rl_user_visit.id_visitor_user')
            .where({
                'rl_user_visit.id_visited_user': id_visited_user
            });
    }

}

module.exports = new RLUserVisitModel();