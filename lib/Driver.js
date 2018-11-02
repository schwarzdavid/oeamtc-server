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

		this._state = Driver.STATE.READY;
		this._assignedMission = null;
		this._missions = [];
		this._logins = [];
		this._connections = [];
	}

	get username(){
		return this._username;
	}

	registerConnection(connection){

	}
}

module.exports = Driver;
