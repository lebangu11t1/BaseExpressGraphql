'use strict';

var groups = require('./groups');

module.exports = function (app) {
    /**
     * [List Routes]
     * 
     */

    //group: groups router
    app.use('/groups', groups);

    /**
     * [Error Routes]
     * 
     */
    app.use(function (req, res) {
        res.status(404).send({url: ' Sorry bro, but ' + req.originalUrl + 'not found'})
    });
};

