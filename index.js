// Dependency
const http = require('http');

const { handelReqRes } = require('./Helpers/handelReqRes');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
	port: 3000,
};

// create server
app.createServer = () => {
	const server = http.createServer(app.handelReqRes);
	server.listen(app.config.port, () => {
		console.log(`this server is running on port ${app.config.port}`);
	});
};

// handel request and response
app.handelReqRes = handelReqRes;
// start the server

app.createServer();
