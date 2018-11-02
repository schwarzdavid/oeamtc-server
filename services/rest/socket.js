const websocket = require('websocket');
const crypto = require('crypto');
const driver = require('../../models/driver');

function run(httpServer) {
	const server = new websocket.server({
		httpServer
	});

	server.on('request', request => {
		console.log('New connection from origin ' + request.origin);

		const connection = request.accept();
		connection._id = crypto.randomBytes(24).toString('hex');

		console.log('Connection accepted');

		connection.on('message', message => {
			if(message.type === 'utf8'){
				const data = JSON.parse(message.utf8Data);

				if(data.type === 'register'){
					return driver.registerConnection(payload.username, connection);
				}
			}
		});
	});
}

module.exports = {run};
