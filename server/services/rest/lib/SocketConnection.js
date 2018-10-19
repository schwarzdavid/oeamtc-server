const crypto = require('crypto');

class SocketConnection {
	constructor(connection, config){
		this._connection = connection;
		this._id = crypto.randomBytes(20).toString('hex');
		this._name = config.name;
		this._location = config.location;

		connection._id = this._id;
	}

	handler(message){
		throw new Error('Implement this in sibling class');
	}

	get location(){
		return this._location;
	}

	get id(){
		return this._id;
	}

	get name(){
		return this._name;
	}

	get connection(){
		return this._connection;
	}
}

module.exports = SocketConnection;
