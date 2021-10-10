const express = require('express');

const router = express.Router();

const pembayaranControllers = require('../controllers/pembayaran');

router.post('/transaction',pembayaranControllers.transaction);

module.exports = router;