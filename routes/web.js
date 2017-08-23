'use strict';

var groups = require('./groups');

module.exports = function (app) {
    /**
     * [List Routes]
     * 
     */

    app.route('/').get(function(req, res, next){
        res.render('home', {title:'home'});
    });

    //group: groups router
    app.use('/groups', groups);

    app.route('/user').get(function(req, res, next){
        res.render('users/profile', {title: 'profile'});
    });

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

