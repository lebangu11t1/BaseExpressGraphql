"use strict";

var moment = require('moment');
    moment().format();

    moment.updateLocale('en', {
        relativeTime : {
            future: "in %s",
            past:   "%s ago",
            s  : 'a few seconds',
            ss : '%d seconds',
            m:  "a minute",
            mm: "%d minutes",
            h:  "an hour",
            hh: "%d hours",
            d:  "a day",
            dd: "%d days",
            M:  "a month",
            MM: "%d months",
            y:  "a year",
            yy: "%d years"
        }
    });
var con = require('../models/connection');
var paginate = require('../config/paginate');

/**
 * [RESTful API]
 */
module.exports = {
    /**
     * [Index function]
     * 
     * @param {any} req 
     * @param {any} res 
     */
    index: function(req, res) {
        //To do something
    },

    /**
     * [Show function]
     * 
     * @param {any} req 
     * @param {any} res
     * render show
     */
    show: function(req, res) {
        var id = req.param('user');
        var query = `SELECT * FROM users WHERE id=${id};`+
        `SELECT users.*, circle_post_comments.* FROM users INNER JOIN circle_post_comments ON users.id = circle_post_comments.user_id WHERE users.id=${id} LIMIT ${paginate.limit} OFFSET 0`;
        con.query(query, function (error, results, fields) {
            if (error) throw error;

            results[1].forEach(function (comment) {
                comment.created_at = moment(comment.created_at).fromNow();
            });

            res.render('users/profile', { 
                title:'show profile',
                user: results[0][0],
                comments: results[1]
            });
        }); 
    },

    /**
     * [Create function]
     * 
     * @param {any} req 
     * @param {any} res 
     */
    create: function(req, res) {
        //To do something
    },

    /**
     * [Store function]
     * 
     * @param {any} req 
     * @param {any} res 
     */
    store: function(req, res) {
        //To do something
    },

    /**
     * [Edit function]
     * 
     * @param {any} req 
     * @param {any} res 
     */
    edit: function(req, res) {
        //To do something
    },

    /**
     * [Update function]
     * 
     * @param {any} req 
     * @param {any} res 
     */
    update: function(req,res) {
        //To do something
    },

    /**
     * [Destroy function]
     * 
     * @param {any} req 
     * @param {any} res 
     */
    destroy: function(req, res) {
        //To do something
    }
}