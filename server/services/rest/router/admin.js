const express = require('express');
const router = express.Router();
const admins = require('../../../../data/admins');

router.route('/login')
	.post((req, res) => {
		if(!req.body.email){
			return res.status(400).send('Bad Request');
		}

		const currAdmin = admins.find(admin => admin.email === req.body.email);

		if(!currAdmin){
			return res.status(404).send('Not Found');
		}

		return res.json(currAdmin);
	});

module.exports = router;
