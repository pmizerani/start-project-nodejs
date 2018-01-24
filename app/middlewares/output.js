const Messages = require('../helpers/messages');

/**
 * output
 * @param req
 * @param res
 * @param next
 */
function output(req, res, next) {

	res.badRequest = function (message = Messages.MSG05) {
		res.status(400).send(message);
	}

	res.unauthorized = function (message = Messages.MSG06) {
		res.status(401).send([message]);
	}

	res.internalError = function (message = Messages.MSG07) {
		console.log(message);
		res.status(500).send([message]);
	}

	res.sendJSON = function (jsonObject) {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(jsonObject));
	}

	next();
}

module.exports = output;