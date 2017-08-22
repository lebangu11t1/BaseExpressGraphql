var express = require('express');
var router = express.Router();

var groupsController = require('../app/controllers/groupsController');

//index
router.get('/', groupsController.index);

//create
router.get('/create', groupsController.create);

//store
router.post('/create', groupsController.store);

//show group
router.get('/:group', groupsController.show);

//show reply
router.get('/:group/:comment', groupsController.show_reply);

//edit
router.get('/:group/edit', groupsController.edit);

//update
router.patch('/:group', groupsController.update);

//delete
router.delete('/:group', groupsController.destroy);

module.exports = router;