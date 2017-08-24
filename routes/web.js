'use strict';

var groups = require('./groups');
var users = require('./users');
var groupsController = require('../app/controllers/groupsController');

module.exports = function (app) {
    /**
     * [List Routes]
     * 
     */

    app.route('/').get(groupsController.home);

    app.route('/loadmore').get(groupsController.loading)

    app.route('/club/:id').get(groupsController.list_a_club);

    app.route('/private').get(groupsController.private);

    //show reply
    app.route('/club/conversation/:comment').get(groupsController.show_reply);

    //group: groups router
    app.use('/groups', groups);

    app.use('/users', users);

    /**
     * [Error Routes]
     * 
     */
    app.use(function (req, res) {
        res.status(404).render('errors/404', {title: 'errors'})
    });
};

