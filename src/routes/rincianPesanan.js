const express = require('express');

const router = express.Router();

const rincianPesananControllers = require('../controllers/rincianPesanan');

router.post('/add',rincianPesananControllers.tambahRincianPesanan);
router.post('/get/byName',rincianPesananControllers.getRincianPesanan);
router.put('/update/:id',rincianPesananControllers.updateRincianPesanan);

module.exports = router;