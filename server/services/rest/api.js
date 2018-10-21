const express = require('express');
const router = express.Router();
const driver = require('./router/driver');
const admin = require('./router/admin');

router.use('/driver', driver);
router.use('/admin', admin);

module.exports = router;
