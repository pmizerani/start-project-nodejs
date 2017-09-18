const Model = require('../classes/model');

class CustomersUsers extends Model {
    constructor() {
        super('users');
    }

    findByUserCredentials({ email, password }) {
        return this.db.select([
            // 'user_customers.id_customers as id_customers',
            // 'user_customers.id AS ucid',
            // 'user_customers.allow_access_administration',
            // 'user_customers.allow_access_financial',
            // 'user_customers.allow_access_support',
            // 'user_customers.additional_user',
            // 'user_customers.id_social_facebook',
            // 'user_customers.id_social_twitter',
            // 'user_customers.id_social_google',
            'users.*'
        ]).from('users')
        // .innerJoin('users', 'user_customers.id_users', 'users.id')
        // .innerJoin('customers', 'user_customers.id_customers', 'customers.id')
        .where({
            'users.email': email,
            'users.password': password
        });
    }

    findByCustomerHash(hash) {
        return this.db.select([
            // 'user_customers.id_customers as id_customers',
            // 'user_customers.id AS ucid',
            // 'user_customers.allow_access_administration',
            // 'user_customers.allow_access_financial',
            // 'user_customers.allow_access_support',
            // 'user_customers.additional_user',
            // 'user_customers.id_social_facebook',
            // 'user_customers.id_social_twitter',
            // 'user_customers.id_social_google',
            'users.*'
        ]).from('users')
        // .innerJoin('users', 'user_customers.id_users', 'users.id')
        // .innerJoin('customers', 'user_customers.id_customers', 'customers.id')
        .where({
            'users.hash': hash,
        });
    }
}

module.exports = new CustomersUsers();