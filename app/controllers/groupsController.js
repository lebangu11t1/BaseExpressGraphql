"use strict";

var datetime = require('node-datetime');
// var bodyParser = require('body-parser');
//
// var urlencodedParser = bodyParser.urlencoded({ extended: true });

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
        res.render('groups/index', {title:'groups'});
    },

    /**
     * [Show function]
     * 
     * @param {any} req 
     * @param {any} res
     * render show
     */
    show: function(req, res) {
        var id = req.params.group;
        var sql = "SELECT * FROM circle_types ; SELECT circle_posts.*, circle_types.id as id_type,circle_types.name, users.avatar, users.id as id_user FROM circle_posts INNER JOIN circle_types ON circle_posts.circle_type_id = circle_types.id INNER JOIN users ON circle_posts.user_id = users.id WHERE circle_posts.circle_type_id = "+ id +" LIMIT "+ paginate.limit +" OFFSET 0";
        con.query(sql, function (err, results, fields) {
            if (err) throw err;

            results[1].forEach(function (post) {
                post.created_at = moment(post.created_at).fromNow();
            });

            res.render('groups/index', {
                title:'group detail',
                clubs : results[1],
                groups : results[0],
                nameGroup : results[1][0].name
            });
        })
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

    /**
     * [Show Reply function]
     * 
     * @param {any} req 
     * @param {any} res 
     */
    show_reply: function(req, res) {
        var circle_post_comment_id = req.param('comment');

        var sql = `SELECT * FROM circle_types;` + `SELECT circle_post_comments.*,users.username,users.avatar FROM circle_post_comments INNER JOIN users ON circle_post_comments.user_id = users.id WHERE circle_post_comments.id=${circle_post_comment_id};`+
        `SELECT circle_post_comments.*,users.username,users.avatar FROM circle_post_comments INNER JOIN users ON circle_post_comments.user_id = users.id WHERE circle_post_comments.parent_id=${circle_post_comment_id} LIMIT ${paginate.limit} OFFSET 0`;
        con.query(sql, function (error, results, fields) {
            if (error) throw error;
            
            results[2].forEach(function (comment) {
                comment.created_at = moment(comment.created_at).fromNow();
            });

            if(results[1]==null) {
                results[1].created_at = moment(results[1][0].created_at).fromNow();
            }

            res.render('groups/reply', { 
                title:'show conversation',
                groups: results[0],
                parent: results[1][0],
                replies: results[2]
            });
        });
    },
    
    /** 
     * [home description] 
     */
    home : function (req, res) {
        var sql = "SELECT * FROM circle_types ; SELECT circle_posts.*, circle_types.id as id_type ,circle_types.name, users.avatar, users.id as id_user FROM circle_posts INNER JOIN circle_types ON circle_posts.circle_type_id = circle_types.id INNER JOIN users ON circle_posts.user_id = users.id  LIMIT "+ paginate.limit +" OFFSET 0";
        con.query(sql, function (error, results, fields) {
            if (error) throw error;

            results[1].forEach(function (post) {
                post.created_at = moment(post.created_at).fromNow();
            });

            res.render('home', {
                groups : results[0],
                title : "home page",
                posts : results[1],
            })
        });
    },

    list_a_club : function (req, res) {
        var id = req.params.id;
        var sql = "SELECT * FROM circle_types ;" +
            "SELECT circle_post_comments.id as id_post_comment, circle_post_comments.body, circle_post_comments.created_at, circle_post_comments.parent_id, users.id as id_user, users.avatar, users.username, circle_posts.title as title_post FROM circle_post_comments INNER JOIN users ON circle_post_comments.user_id = users.id INNER JOIN circle_posts ON circle_post_comments.circle_post_id = circle_posts.id  WHERE circle_post_id = "+ id +" LIMIT "+ paginate.limit +" OFFSET 0 ";
        con.query(sql, function (err, results) {
            if (err) {
                return res.status(404).render('errors/404', {title: 'errors'});
            }

            results[1].forEach(function (comment) {
                comment.created_at = moment(comment.created_at).fromNow();
            });

            var title_post = "";
            if (results[1].length > 0) {
                title_post = results[1][0].title_post;
            }

            res.render('groups/show', {
                title : 'detail club',
                groups : results[0],
                comments : results[1],
                title_post : title_post
            });
        });
    },

    loading_club: function (req, res) {
        var offset = req.param('offset');
        var sql = `SELECT COUNT(id) AS total_records FROM circle_posts; SELECT circle_posts.*, circle_types.id as id_type ,circle_types.name, users.avatar, users.id as id_user FROM circle_posts INNER JOIN circle_types ON circle_posts.circle_type_id = circle_types.id INNER JOIN users ON circle_posts.user_id = users.id  LIMIT ${paginate.limit} OFFSET ${offset}`;
        con.query(sql, function (error, results, fields) {
            if (error) throw error;

            results[1].forEach(function (post) {
                post.created_at = moment(post.created_at).fromNow();
            });
            res.send(results);
        });
    },

    private : function (req, res) {
        res.render('errors/503', {
            title : 'private page'
        });
    },

    userInformation : function (req, res) {
        var sql = `SELECT circle_post_comments.*, users.username, users.avatar, users.id as id_user 
                    FROM circle_post_comments 
                    INNER JOIN users ON circle_post_comments.user_id = users.id 
                    WHERE circle_post_comments.id = ${req.params.parent_id}`;

        con.query(sql, function (err, results) {
            if (err) {
                return res.status(404).render('errors/404', {title: 'errors'});
            }
            var data = 2; // empty
            if (results.length > 0) {
                data = results[0];
                data.created_at = moment(data.created_at).fromNow();
            }
            res.json(data);
        });
    }
}