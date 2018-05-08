// Database credential for each enviroment MySQL
const databaseCredentialsMySQL = {
    local: {
        hostname: process.env.NODE_MYSQL_HOST || '127.0.0.1',
        username: process.env.NODE_MYSQL_USER || 'user',
        password: process.env.NODE_MYSQL_PASS || 'pass',
        database: 'database-name',
        socketPath: 'null',
        debug: false,
    },
    test: {
        hostname: process.env.NODE_MYSQL_HOST || '127.0.0.1',
        username: process.env.NODE_MYSQL_USER || 'user',
        password: process.env.NODE_MYSQL_PASS || 'pass',
        database: 'database-name',
        socketPath: null,
        debug: false,
    },
    production: {
        hostname: process.env.NODE_MYSQL_HOST || '127.0.0.1',
        username: process.env.NODE_MYSQL_USER || 'user',
        password: process.env.NODE_MYSQL_PASS || 'pass',
        database: 'database-name',
        socketPath: null,
        debug: false,
    }
}

// Ports for each enviroment
const ports = {
	local: 7070,
	test: 6667,
	production: 7776
};

const env = process.env.NODE_ENV || 'local';

module.exports = {
	database: {
		hostname: databaseCredentialsMySQL[env]['hostname'],
		username: databaseCredentialsMySQL[env]['username'],
		password: databaseCredentialsMySQL[env]['password'],
		database: databaseCredentialsMySQL[env]['database'],
		socketPath: databaseCredentialsMySQL[env]['socketPath'],
		debug: databaseCredentialsMySQL[env]['debug']
	},
	port: ports[env]
};