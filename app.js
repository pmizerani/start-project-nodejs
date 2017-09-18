const express = require('express');
const app = express();
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('./app/middlewares/cors.js');
const output = require('./app/middlewares/output');
const consign = require("consign");

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(output);
app.use(cors);

// Routes

//loading dependencies
consign({cwd: 'app', verbose: false})
    .include("models")
    .then("controllers")
    .then("routes")
    .into(app);

// Multicore
if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    app.listen(config.port, function () {
        console.log(`Middleware listening on port ${config.port}!`);
    });
}