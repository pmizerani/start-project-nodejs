const express = require('express');
const app = express();
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('./app/middlewares/cors.js');
const output = require('./app/middlewares/output');
const consign = require('consign');
const http = require('http');
const path = require('path');

// Middlewares

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./public'));
app.use(output);
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes

//loading dependencies
consign({cwd: 'app', verbose: false})
    .include('routes')
    .into(app);

// Multicore
if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    http.createServer(app).listen(config.port, function() {
        console.log(`Middleware listening on port ${config.port}!`);
    });
}