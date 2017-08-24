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

    //group: groups router
    app.use('/groups', groups);

    app.use('/users', users);

    app.route('/reply').get(function(req, res, next){
        res.render('groups/show', {title: 'show group'});
    });

    /**
     * [Error Routes]
     * 
     */
    app.use(function (req, res) {
        res.status(404).render('errors/404', {title: 'errors'})
    });
};

