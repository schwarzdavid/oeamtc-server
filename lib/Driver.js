class Driver {
	static get STATE() {
		return {
			READY: 1,
			MISSION_RECEIVED: 2
		}
	}

	constructor(initialData) {
		this._username = initialData.username || '01234';
		this._servicecenter = {
			id: initialData.servicecenter.id || 1234,
			name: initialData.servicecenter.name || 'Zentrale Erdberg'
		};
		this._radionumber = initialData.radionumber || 34567;
		this._missions = initialData.missions || [];

		this._state = Driver.STATE.READY;
		this._assignedMission = null;
		this._logins = [];
		this._connections = [];
	}

	get username(){
		return this._username;
	}

	get missions(){
		return this._missions;
	}

	addMission(mission){
		this._missions.push(mission);
		this.broadcast('mission:added', mission);
	}

	broadcast(type, payload){
		const data = JSON.stringify({
			type,
			payload
		});

		this._connections.forEach(con => {
			con.send(data);
		});
	}

	registerConnection(connection){
		connection.on('close', () => {
			const index = this._connections.findIndex(con => con._id === connection.id);
			this._connections.splice(index, 1);
		});

		this._connections.push(connection);
	}
}

module.exports = Driver;
