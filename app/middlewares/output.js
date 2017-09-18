function output(req, res, next) {
    
    res.badRequest = function(message = 'Bad request') {
        res.status(400).send(message);
    }

    res.unauthorized = function(message = 'Unauthorized') {
        res.status(401).send(message);
    }

    res.internalError = function(message = 'Something went wrong') {
        res.status(500).send(message);
    }

    res.sendJSON = function(jsonObject) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(jsonObject));
    }

    next();
}

module.exports = output;