const express = require('express');
const router = express.Router();
const driver = require('../../../../data/driver');

router.route('/login')
	.post((req, res) => {
		if(!req.body.email){
			return res.status(400).send('Bad Request');
		}

		const currDriver = driver.find(_driver => _driver.email === req.body.email);

		if(!currDriver){
			return res.status(404).send('Not Found');
		}

		return res.json(currDriver);
	});

module.exports = router;
