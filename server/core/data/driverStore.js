const driver = require('../../../data/driver');
const locations = require('../../../data/locations');


module.exports = {
	getDriverById(id) {
		return driver.find(_driver => _driver.id === id);
	}
};
