const Driver = require('../lib/Driver');
const data = [];

function findByUsername(username) {
	return data.find(_driver => _driver.username === username);
}

function registerConnection(username, connection) {
	const driver = findByUsername(username);

	if(!driver){
		console.log(`Driver with username ${username} doesn't exist.`);
		return;
	}

	driver.registerConnection(connection);
}

function getMissionsOfUser(username) {
	const driver = findByUsername(username);

	if(!driver){
		console.log(`Driver with username ${username} doesn't exist.`);
		return [];
	}

	return driver.missions;
}

(function init() {
	const initDriver = require('../data/driver');

	initDriver.forEach(_driver => {
		data.push(new Driver(_driver));
	});
}());

module.exports = {
	findByUsername,
	registerConnection,
	getMissionsOfUser
};
