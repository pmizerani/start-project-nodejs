const express = require('express');
const app = express();
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const output = require('./app/middlewares/output');
const consign = require('consign');
const http = require('http');
const fs = require('fs');
const uploadDir = './uploads';
const uploadDirProduction = './uploads';

// Middlewares
app.use(output);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options('*', cors()) // include before other routes

const env = process.env.NODE_ENV || 'local';

// Cria diretorio de upload se nao existir
if (('local' === env || 'development' === env) && !fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
} else if (('test' === env || 'production' === env) && !fs.existsSync(uploadDirProduction)){
    fs.mkdirSync(uploadDirProduction);
}

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
		console.log(`API listening on port ${config.port}!`);
	});
}