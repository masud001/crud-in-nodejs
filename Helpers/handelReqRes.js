/*

Description: handel request and response 
*/

// dependency
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../Handlers/routeHandler/notFoundHandler');

// handler object - handler scaffolding
const handler = {};

handler.handelReqRes = (req, res) => {
	// get the url and parse it
	const parsedUrl = url.parse(req.url, true);
	const path = parsedUrl.pathname;
	const trimmedPath = path.replace(/^\/+|\/+$/g, '');
	const method = req.method.toLowerCase();
	const queryStringObject = parsedUrl.query;
	const headerObject = req.headers;

	const requestProperty = {
		parsedUrl,
		path,
		trimmedPath,
		method,
		queryStringObject,
		headerObject,
	};

	const decoder = new StringDecoder('utf-8');
	let realData = '';

	const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

	chosenHandler(requestProperty, (statusCode, payload) => {
		statusCode = typeof statusCode === 'number' ? statusCode : 500;
		payload = typeof payload === 'object' ? payload : {};

		const payloadString = JSON.stringify(payload);

		res.writeHead(statusCode);
		res.end(payloadString);
	});

	req.on('data', (buffer) => {
		realData += decoder.write(buffer);
	});
	req.on('end', () => {
		realData += decoder.end();
		console.log(realData);
	});
};

module.exports = handler;
