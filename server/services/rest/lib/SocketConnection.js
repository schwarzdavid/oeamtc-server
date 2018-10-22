const crypto = require('crypto');

class SocketConnection {
	constructor(connection, config){
		this._connection = connection;
		this._id = config.id;
		this._name = config.name;
		this._location = config.location;

		connection._id = this._id;
	}

	handler(message){
		throw new Error('Implement this in sibling class');
	}

	send(type, payload){
		const data = JSON.stringify({type, payload});
		this._connection.send(data);
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
