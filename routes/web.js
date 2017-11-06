'use strict';

var AuthController = require('../app/controllers/AuthController');
var UserController = require('../app/controllers/UserController');

module.exports = function (app) {

    app.route('/').get(UserController.index);
    /**
     * [List Routes]
     * 
     */
    app.route('/login').get(AuthController.login);

    /**
     * [Error Routes]
     * 
     */
    app.use(function (req, res) {
        res.status(404).render('errors/404', {title: 'errors'})
    });
};

