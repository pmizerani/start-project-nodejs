let express = require("express");
let consign = require("consign");
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let cors = require('cors');
let logger = require("./logger")();
let sequelize = require("./sequelize")();
let utils = require("./utils");
let mail = require("./mail");
let expressValidator = require('express-validator');
let security = require('./security');

module.exports = () => {

      //Variables
      let app = express();

      app.set('port', 8009); //set port to use this app

      //set global Variables
      app.logger = logger.getLogger();
      app.debugging = logger.getDebug();
      app.utils = utils(app);

      app.utils.checkBasicFolders();//create basic folders
      app.mail = mail(app);//configure mail
      app.sequelize = sequelize.getConnection();//configure ORM

      app.baseToken = "base-token";
      app.security = security(app);

      app.debug = process.env.NODE_DEBUG || false;//debug enviroment

      //check envitoment
      app.env = process.env.NODE_ENV || 'development';

      if (app.env == "development") {

            console.log("Application starting in DEVELOPMENT mode...");

      } else if (app.env == "test") {

            console.log("Application starting in TEST mode...");

      } else if (app.env == "production") {

            console.log("Application starting in PRODUCTION mode...");

      }

      app.use(express.static('./public'));//midleware

      //method bodyParser
      app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
      app.use(bodyParser.json({limit: '10mb'}));
      app.use(require('method-override')());

      //config cookie and session
      app.cookieParser = cookieParser;
      app.cookieSecret = 'cookieSecret';
      app.cookieVersion = '1.0.0';
      app.use(app.cookieParser(app.cookieSecret));

      //config session
      app.use(session(
            {
                  secret: 'cookieSecret',
                  resave: true,
                  saveUninitialized: true
            }
      ));
      app.use(expressValidator());

      //resolve problems with cors
      app.use(cors());

      //set express validator
      app.use(expressValidator());

      //loading dependencies
      consign({cwd: 'app', verbose: false})
            .include("models")
            .then("controllers")
            .then("routes")
            .into(app);

      //Config error 404 for routes not configured and redirect for another url # CONFIGURE URL FOR REDIRECT
      app.get('*', (req, res) => {
            res.status(404).send('Not found');
      });

      //return
      return app;
};