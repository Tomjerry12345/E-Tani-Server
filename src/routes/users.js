const express = require('express');

const router = express.Router();

const usersControllers = require('../controllers/users');

router.get('/getAllUsers', usersControllers.getAllUser);

// router.put('/:idUser', usersControllers.updateStatusLogin);

module.exports = router;