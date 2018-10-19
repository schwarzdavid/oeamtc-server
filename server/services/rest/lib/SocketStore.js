const locationData = require('../../../data/locations');
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
	for(let location of locations){
		unregister(id, location.admins);
		unregister(id, location.driver);
	}
	console.log(`User with id ${id} unregistered`);
}

module.exports = {
	locations,
	registerDriver,
	registerLocation,
	sendDriver,
	sendAdmins
}
