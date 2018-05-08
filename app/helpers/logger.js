const fs = require('fs');

//Cria pasta de logs
if(!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
}

const opts = {
    errorEventName:'error',
    logDirectory:'logs', // NOTE: pasta deve existir e ter permissao de escrita
    fileNamePattern:'error_log-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger( opts );

module.exports = log;