const SocketConnection = require('./SocketConnection');
const store = require('../../../core/data/driverStore');

class Driver extends SocketConnection {
	constructor(connection, payload){
		const driverData = store.getDriverById(payload.id);
		super(connection, driverData);
	}

	handler(message) {

	}
}

module.exports = Driver;
