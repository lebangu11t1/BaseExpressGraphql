var express = require('express');
var router = express.Router();

var usersController = require('../app/controllers/usersController');

//show user
router.get('/:user', usersController.show);

module.exports = router;