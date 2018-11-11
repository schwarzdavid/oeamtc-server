class Driver {
	static get STATE() {
		return {
			READY: 1,
			MISSION_RECEIVED: 2,
			ARRIVING: 3,
			AT_WORK: 4,
			MOVING_ON: 5
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

		this._state = initialData.state || Driver.STATE.READY;
		this._assignedMission = null;
		this._logins = [];
		this._connections = [];
	}

	get username() {
		return this._username;
	}

	get missions() {
		return this._missions;
	}

	get assignedMission(){
		return this._assignedMission;
	}

	addMission(mission) {
		this._missions.push(mission);
		this.broadcast('mission:added', mission);

		if (this._state === Driver.STATE.READY) {
			this.setState(Driver.STATE.MISSION_RECEIVED);
		}
	}

	setState(state, ignoreId) {
		this._state = state;
		this.broadcast('user:state', state, ignoreId);
	}

	assignMission(ignoreId) {
		this._assignedMission = this._missions.shift();

		if (this._assignedMission) {
			this.broadcast('mission:assigned', this._assignedMission, ignoreId);
			this.setState(Driver.STATE.ARRIVING);
		}

		return this._assignedMission;
	}

	destinationArrived(ignoreId){
		this.setState(Driver.STATE.AT_WORK, ignoreId);
	}

	broadcast(type, payload, ignoreId) {
		const data = JSON.stringify({
			type,
			payload
		});

		this._connections.forEach(con => {
			if (con._id !== ignoreId) {
				con.send(data);
			}
		});
	}

	registerConnection(connection) {
		connection.on('close', () => {
			const index = this._connections.findIndex(con => con._id === connection.id);
			this._connections.splice(index, 1);
		});

		connection.send(JSON.stringify({
			type: 'register:success',
			payload: {
				connId: connection._id,
				dump: this.dump()
			}
		}));

		this._connections.push(connection);
	}

	dump() {
		return {
			user: this.toJSON(),
			missions: this._missions,
			assignedMission: this._assignedMission
		}
	}

	toJSON() {
		return {
			username: this._username,
			servicecenter: this._servicecenter,
			radionumber: this._radionumber,
			state: this._state
		};
	}
}

module.exports = Driver;
