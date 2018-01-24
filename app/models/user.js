const Model = require('../classes/model');

class UserModel extends Model {

    /**
     * constructor
     */
    constructor() {
        super('user');
    }

    /**
     * findByUserCredentials
     * @param email
     * @param password
     */
    findByUserCredentials({ email, password }) {
        return this.db.select([
            'user.id',
			'user.id_access_level',
			'user.name',
			'user.photo',
			'user.digital',
			'user.enable',
			'user.email',
			'user.created_at',
			'user.updated_at',
        ]).from('user')
        .where({
            'user.email': email,
            'user.password': password,
            'user.enable':1
        });
    }

    /**
     * findByID
     * @param id
     */
    findByID({ id }) {
        return this.db.select([
            'user.*',
            'user_information.*',
            'city.name as city_name',
            'state_province.id as state_province_id',
            'state_province.name as state_province_name',
            'country.id as country_id',
            'country.name as country_name'
        ]).from('user')
            .leftJoin('user_information', 'user_information.id_user', 'user.id')
            .leftJoin('city', 'city.id', 'user.id_city')
            .leftJoin('state_province', 'state_province.id', 'city.id_state_province')
            .leftJoin('country', 'country.id', 'state_province.id_country')
        .where({
            'user.id': id
        });
    }

}

module.exports = new UserModel();