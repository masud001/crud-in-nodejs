// all routes in this file

// dependency

const { sampleHandler } = require('./Handlers/routeHandler/sampleHandler');

const routes = {
	sample: sampleHandler,
};

module.exports = routes;
