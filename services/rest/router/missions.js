const express = require('express');
const router = express.Router();
const driver = require('../../../models/driver');

router.route('/')
	.get((req, res) => {
		const authorization = req.get('Authorization');
		if (!authorization) {
			return res.status(403).send('Forbidden');
		}

		const missions = driver.getMissionsOfUser(authorization);

		return res.json(missions);
	});

router.route('/assign')
	.post((req, res) => {
		const authorization = req.get('Authorization');
		if (!authorization) {
			return res.status(403).send('Forbidden');
		}

		const currDriver = driver.findByUsername(authorization);

		if (!currDriver) {
			return res.status(404).send('Not Found');
		}

		if (currDriver.missions.length === 0) {
			return res.status(400).send('Bad Request');
		}

		const assignedMission = currDriver.assignMission(req.get('if-match'));

		return res.json(assignedMission);
	});

router.route('/arrived')
	.post((req, res) => {
		const authorization = req.get('Authorization');
		if (!authorization) {
			return res.status(403).send('Forbidden');
		}

		const currDriver = driver.findByUsername(authorization);

		if (!currDriver) {
			return res.status(404).send('Not Found');
		}

		if (!currDriver.assignedMission) {
			return res.status(400).send('Bad Request');
		}

		currDriver.destinationArrived(req.get('if-match'));

		return res.send('OK');
	});

router.route('/next')
	.get((req, res) => {
		const authorization = req.get('Authorization');
		if (!authorization) {
			return res.status(403).send('Forbidden');
		}

		const currDriver = driver.findByUsername(authorization);

		if (!currDriver) {
			return res.status(404).send('Not Found');
		}

		if (currDriver.missions.length === 0) {
			return res.status(400).send('Bad Request');
		}

		return res.json(currDriver.missions[0]);
	});

module.exports = router;
