//Includes
let winston = require('winston');

//module exports
module.exports = () => {
    
    //Variables
    let controller = {};

    /**
     * getLogger
     */
    controller.getLogger = () => {
        
        //Variables
        let logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({filename: './logs/errors.log'})
            ]
        });
        
        //return
        return logger;     

    };//end getLogger

    /**
     * getDebug
     */
    controller.getDebug = () => {
        
        //Variables
        let logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({filename: './logs/debug.log'})
            ]
        });
        
        //return
        return logger;

    };//end getDebug

    //Returns
    return controller;
};