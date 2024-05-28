const handler = {};

handler.notFoundHandler = (requestProperty, callback) => {
	console.log('404 not found handler', requestProperty);
	callback(404, {
		message: 'your request not found',
	});
};

module.exports = handler;
