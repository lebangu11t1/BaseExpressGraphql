'use strict';

module.exports = function (app) {
    var groupsController = require('../app/controllers/groupsController');

    // todo list routes
    app.route('/groups')
        .get(groupsController.list_all_groups)

    app.use(function (req, res) {
        res.status(404).send({url: ' Sorry bro, but ' + req.originalUrl + 'not found'})
    });
};

