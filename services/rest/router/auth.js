const express = require('express');
const router = express.Router();
const driver = require('../../../models/driver');

router.route('/login')
	.post((req, res) => {
		if(!req.body.username){
			return res.status(400).send('Bad Request');
		}

		const currDriver = driver.findByUsername(req.body.username);

		if(!currDriver){
			return res.status(404).send('Not Found');
		}

		const output = currDriver.toJSON();

		return res.json(output);
	});

module.exports = router;
