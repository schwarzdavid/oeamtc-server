const express = require('express');
const router = express.Router();
const driver = require('../../../models/driver');

router.route('/addMission')
	.post((req, res) => {
		const _driver = driver.findByUsername(req.body.username);

		if(!_driver){
			return res.status(404).send('Not Found');
		}

		_driver.addMission(req.body.mission);
		res.send('OK');
	});

module.exports = router;
