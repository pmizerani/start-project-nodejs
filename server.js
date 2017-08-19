//includes
let app = require("./config/express")();
let http = require('http').createServer(app);

//create server node
http.listen(app.get('port'), () => {
    console.log('Application listen on port: ' + app.get('port'));
});