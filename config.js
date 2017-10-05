// Database credential for each enviroment
const databaseCredentials = {
    local: {
        hostname: '127.0.0.1',
        username: 'root',
        password: 'root',
        database: 'ovulo_doacao',
        socketPath: 'null',
        debug: false,
    },
    test: {
        hostname: '127.0.0.1',
        username: 'root',
        password: 'root',
        database: 'database',
        socketPath: null,
        debug: false,
    },
    production: {
        hostname: '127.0.0.1',
        username: 'root',
        password: 'root',
        database: 'database',
        socketPath: null,
        debug: false,
    }
}

// Ports for each enviroment
const ports = {
    local: 7100,
    test: 6667,
    production: 7776
};

const env = process.env.NODE_ENV || 'local';

module.exports = {
    database: {
        hostname: databaseCredentials[env]['hostname'],
        username: databaseCredentials[env]['username'],
        password: databaseCredentials[env]['password'], 
        database: databaseCredentials[env]['database'], 
        socketPath: databaseCredentials[env]['socketPath'],
        debug: databaseCredentials[env]['debug']
    },
    port: ports[env]
};