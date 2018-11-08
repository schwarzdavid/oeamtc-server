const express = require('express');
const router = express.Router();
const driver = require('../../../models/driver');

router.route('/addMission')
	.post((req, res) => {
		const _driver = driver.findByUsername(req.body.username);

		if(!_driver){
			return res.status(404).send('Not Found');
		}

		req.body.mission.callTime = new Date().toTimeString().substr(0, 5);

		_driver.addMission(req.body.mission);
		res.send('OK');
	});

module.exports = router;
