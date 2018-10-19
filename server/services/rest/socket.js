const websocket = require('websocket');
const locations = {};
const Driver = require('./lib/Driver');
const LocationAdmin = require('./lib/LocationAdmin');
const store = require('./lib/LocationAdmin');

function run(httpServer) {
	const server = new websocket.server({
		httpServer
	});

	server.on('request', request => {
		console.log('New connection from origin ' + request.origin);

		const connection = request.accept();

		console.log('Connection accepted');

		connection.on('message', message => {
			if(message.type === 'utf8'){
				const data = JSON.parse(message.utf8Data);

				if(data.type === 'register:driver'){
					return store.registerDriver(new Driver(connection, data.payload));
				}

				if(data.type === 'register:location'){
					return store.registerLocation(new LocationAdmin(connection, data.payload));
				}

				if(data.type === 'unregister'){
					return store.unregisterAll(connection._id);
				}
			}
		});

		connection.on('close', () => {
			return store.unregisterAll(connection._id);
		});
	});
}

module.exports = {run};
