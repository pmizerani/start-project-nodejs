const config = require ('../../config');
const { hostname, username, password, database, socketPath, debug } = config.database;

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : hostname,
        user : username,
        password : password,
        database : database,
        socketPath: socketPath,
        debug: debug
    }
});

module.exports = knex;