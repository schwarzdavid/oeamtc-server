const express = require('express');
const router = express.Router();
const driver = require('../../../models/driver');

router.route('/')
	.get((req, res) => {
		if (!req.headers.authorization) {
			return res.status(403).send('Forbidden');
		}

		const missions = driver.getMissionsOfUser(req.headers.authorization);

		return res.json(missions);
	});

module.exports = router;
