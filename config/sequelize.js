//Includes
let Sequelize = require('sequelize');
//exports
module.exports = () => {

      //Variables
      let controller = {};

      /**
       * getDbConfig
       */
      getDbConfig = () => {

            //Variables
            let config = {
                  host: 'localhost',
                  database: 'database',
                  user: 'root',
                  pass: 'root',
                  adapter: 'mariadb',
            };

            let env = process.env.NODE_ENV || 'development';

            //checking env
            if (env === "development") {

                  config.host = '127.0.0.1';
                  config.database = "database";
                  config.user = "root";
                  config.pass = "root";
                  console.log("Sequelize started in DEVELOPMENT mode...");

            } else if (env === "test") {

                  config.host = '127.0.0.1';
                  config.database = "database";
                  config.user = "root";
                  config.pass = "root";
                  console.log("Sequelize started in TEST mode...");

            } else if (env === "production") {

                  config.host = '127.0.0.1';
                  config.database = "database";
                  config.user = "root";
                  config.pass = "root";
                  console.log("Sequelize started in PRODUCTION mode...");
            }

            //return config
            return config;

      };//end getDbConfig

      /**
       * getConnection
       * @param {*} debug
       */
      controller.getConnection = (debug) => {

            //Variables
            let config = getDbConfig();
            let connection = new Sequelize(config.database, config.user, config.pass, {
                  host: config.host,
                  dialect: config.adapter
            });

            //return
            return connection;

      };//end getConnection

      //return
      return controller;
};