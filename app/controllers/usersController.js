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
        `SELECT users.*, circle_post_comments.* FROM users INNER JOIN circle_post_comments ON users.id = circle_post_comments.user_id WHERE users.id=${id} LIMIT ${paginate.limit} OFFSET 0;`+
        `SELECT COUNT(users.id) AS 'total' FROM users INNER JOIN circle_post_comments ON users.id = circle_post_comments.user_id WHERE users.id=${id}`;
        con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(404).render('errors/404', {title: 'errors'});
            }
            
            results[1].forEach(function (comment) {
                comment.created_at = moment(comment.created_at).fromNow();
            });

            res.render('users/profile', { 
                title:'show profile',
                user: results[0][0],
                comments: results[1],
                user_id: id,
                total_comment: results[2][0]
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
    },

    loading_comment: function(req, res) {
        let user_id = req.param('user_id');
        let offset = req.param('offset');
        let query = `SELECT users.*, circle_post_comments.* FROM users INNER JOIN circle_post_comments ON users.id = circle_post_comments.user_id WHERE users.id=${user_id} LIMIT ${paginate.limit} OFFSET ${offset}`;
        con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(404).render('errors/404', {title: 'errors'});
            }

            results.forEach(function (comment) {
                comment.created_at = moment(comment.created_at).fromNow();
            });

            res.send(results);
        }); 
    },
}