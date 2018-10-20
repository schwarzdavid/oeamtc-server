const locationData = require('../../../../data/locations');
const locations = {};

locationData.forEach(location => {
	locations[location.id] = {
		...location,
		admins: [],
		driver: []
	};
});

function broadcast(connections, type, ...payload) {
	const data = JSON.stringify({type, payload});
	connections.forEach(connection => {
		connection.connection.emit(data);
	});
}

function sendDriver(location, id, type, ...payload) {
	const driver = locations[location].driver.find(item => item.id === id);

	if(!driver){
		return false;
	}

	const data = JSON.stringify({type, payload});
	driver.connection.emit(data);
}

function sendAdmins(location, type, ...payload) {
	broadcast(locations[location].admins, type, ...payload);
}

function registerDriver(driver) {
	locations[driver.location].driver.push(driver);

	driver.connection.on('message', driver.handler);
	sendAdmins('driverRegistered');

	console.log(`User with id ${connection._id} connected as driver`);
}

function registerLocation(admin) {
	locations[admin.location].admins.push(admin);

	admin.connection.on('message', admin.handler);

	console.log(`User with id ${connection._id} connected as admin`);
}

function unregister(id, connections) {
	for(let i in connections){
		if(connections[i].id === id){
			connections[i].connection.off('message', connections[j].handler);
			connections.splice(i, 1);
		}
	}
}

function unregisterAll(id) {
	for(let i in locations){
		unregister(id, locations[i].admins);
		unregister(id, locations[i].driver);
	}
	console.log(`User with id ${id} unregistered`);
}

module.exports = {
	locations,
	registerDriver,
	registerLocation,
	sendDriver,
	sendAdmins,
	unregisterAll
};
