const express = require('express');
const router = express.Router();

function deferResponse(req, res) {
	setTimeout(() => {
		res.send("ok");
	}, 2000);
}

router.route('/alert')
	.post(deferResponse);

router.route('/call-desire')
	.post(deferResponse);

module.exports = router;
