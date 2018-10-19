const websocket = require('websocket');
const crypto = require('crypto');
const locations = {};
const locationData = require('../../../data/locations');

locationData.forEach(location => {
	locations[location.id] = {
		...location,
		admins: [],
		driver: []
	};
});

function registerDriver(location, connection) {
	locations[location].driver.push(connection);
	console.log(`User with id ${connection._id} connected as driver`);
}

function registerLocation(location) {
	locations[location].driver.push(connection);
	console.log(`User with id ${connection._id} connected as admin`);
}

function unregister(id) {
	for(let i in locations){
		for(let j in locations.driver){
			if(locations[i].driver[j]._id === id){
				locations[i].driver.splice(j, 1);
			}
		}

		for (let j in locations.admin){
			if(locations[i].admins[j]._id === id){
				locations[i].admins.splice(j, 1);
			}
		}
	}
	console.log(`User with id ${id} unregistered`);
}

function run(httpServer) {
	const server = new websocket.server({
		httpServer
	});

	server.on('request', request => {
		console.log('New connection from origin ' + request.origin);

		const connection = request.accept();
		connection._id = crypto.randomBytes(20).toString('hex');

		console.log('Connection accepted');

		connection.on('message', message => {
			if(message.type === 'utf8'){
				const data = JSON.parse(message.utf8Data);

				if(data.type === 'register:driver'){
					return registerDriver(data.payload, connection);
				}

				if(data.type === 'register:location'){
					return registerLocation(data.payload, connection);
				}

				if(data.type === 'unregister'){
					return unregister(connection._id);
				}
			}
		});

		connection.on('close', () => {
			return unregister(connection._id);
		});
	});
}

module.exports = {run};
