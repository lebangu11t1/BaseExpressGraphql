"use strict";

var con = require('../models/connection');
var paginate = require('../config/paginate');
var moment = require('moment');
moment.locale('ja');


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
        var sql = "SELECT * FROM circle_types ; SELECT circle_posts.*, circle_types.color, circle_types.id as id_type,circle_types.name, users.avatar, users.username, users.id as id_user FROM circle_posts INNER JOIN circle_types ON circle_posts.circle_type_id = circle_types.id INNER JOIN users ON circle_posts.user_id = users.id WHERE circle_posts.circle_type_id = "+ id +" LIMIT "+ paginate.limit +" OFFSET 0; " +
            " SELECT * FROM circle_types WHERE id = "+ id +" ";
        con.query(sql, function (err, results, fields) {
            if (err) return res.status(404).render('errors/404', {title: 'errors'});

            results[1].forEach(function (post) {
                post.created_at = moment(post.created_at).fromNow();
            });

            var name = '';
            if ( typeof results[2][0] === 'undefined') {
                return res.status(404).render('errors/404', {title: 'errors'});
            } else {
                name = results[2][0].name;
            }
            
            res.render('groups/index', {
                title:'group detail',
                clubs : results[1],
                groups : results[0],
                nameGroup : name,
                group_id: id,
                group_color: results[1][0].color
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
            if (error) return res.status(404).render('errors/404', {title: 'errors'});
            
            results[2].forEach(function (comment) {
                comment.created_at = moment(comment.created_at).fromNow();
            });

            if(results[1][0]!=null) {
                results[1][0].created_at = moment(results[1][0].created_at).fromNow();
            }

            res.render('groups/reply', { 
                title:'show conversation',
                groups: results[0],
                parent: results[1][0],
                replies: results[2],
                circle_post_comment_id: circle_post_comment_id
            });
        });
    },
    
    /** 
     * [home description] 
     */
    home : function (req, res) {
        var sql = "SELECT * FROM circle_types ; SELECT circle_posts.*, circle_types.color, circle_types.id as id_type ,circle_types.name, users.avatar, users.username, users.id as id_user FROM circle_posts INNER JOIN circle_types ON circle_posts.circle_type_id = circle_types.id INNER JOIN users ON circle_posts.user_id = users.id  LIMIT "+ paginate.limit +" OFFSET 0";
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
            "SELECT circle_post_comments.id as id_post_comment, circle_post_comments.body, circle_post_comments.created_at, circle_post_comments.parent_id, users.id as id_user, users.avatar, users.username, circle_posts.title as title_post FROM circle_post_comments INNER JOIN users ON circle_post_comments.user_id = users.id INNER JOIN circle_posts ON circle_post_comments.circle_post_id = circle_posts.id  WHERE circle_post_id = "+ id +" LIMIT "+ paginate.limit +" OFFSET 0 ;" +
            " SELECT * FROM circle_posts WHERE id = "+ id +" ";
        con.query(sql, function (err, results) {
            if (err) {
                return res.status(404).render('errors/404', {title: 'errors'});
            }

            var title_post = "";
            if (typeof results[2][0] === 'undefined') {
                return res.status(404).render('errors/404', {title: 'errors'});
            } else {
                title_post = results[2][0].title;
            }

            if (results[1].length > 0) {
                results[1].forEach(function (comment) {
                    comment.created_at = moment(comment.created_at).fromNow();
                });
            }

            res.render('groups/show', {
                title : 'detail club',
                groups : results[0],
                comments : results[1],
                title_post : title_post,
                circle_post_id: id
            });
        });
    },

    loading_club: function (req, res) {
        let offset = req.param('offset');
        let sql = `SELECT COUNT(id) AS total_records FROM circle_posts; SELECT circle_posts.*, circle_types.id as id_type ,circle_types.name, users.avatar, users.username, users.id as id_user FROM circle_posts INNER JOIN circle_types ON circle_posts.circle_type_id = circle_types.id INNER JOIN users ON circle_posts.user_id = users.id  LIMIT ${paginate.limit} OFFSET ${offset}`;
        con.query(sql, function (error, results, fields) {
            if (error) {
                return res.status(404).render('errors/404', {title: 'errors'});
            }

            results[1].forEach(function (post) {
                post.created_at = moment(post.created_at).fromNow();
            });
            res.send(results);
        });
    },

    loading_group: function(req, res) {
        let group_id = req.param('group');
        let offset = req.param('offset');
        let sql = `SELECT circle_posts.*, circle_types.id as id_type,circle_types.name, users.avatar, users.username, users.id as id_user FROM circle_posts INNER JOIN circle_types ON circle_posts.circle_type_id = circle_types.id INNER JOIN users ON circle_posts.user_id = users.id WHERE circle_posts.circle_type_id = ${group_id} LIMIT ${paginate.limit} OFFSET ${offset}`;
        con.query(sql, function (err, results, fields) {
            if (err) {
                return res.status(404).render('errors/404', {title: 'errors'});
            }

            results.forEach(function (group) {
                group.created_at = moment(group.created_at).fromNow();
            });

            res.send(results);
        })
    },

    loading_talk: function(req, res) {
        let circle_post_comment_id = req.param('comment_id');
        let offset = req.param('offset');
        var sql = `SELECT circle_post_comments.*,users.username,users.avatar FROM circle_post_comments INNER JOIN users ON circle_post_comments.user_id = users.id WHERE circle_post_comments.parent_id=${circle_post_comment_id} LIMIT ${paginate.limit} OFFSET ${offset}`;
        con.query(sql, function (error, results, fields) {
            if (error) {
                return res.status(404).render('errors/404', {title: 'errors'});
            }
            
            results.forEach(function (comment) {
                comment.created_at = moment(comment.created_at).fromNow();
            });
            res.send(results);
        });
    },

    loading_comment: function (req, res) {
        let circle_post_id = req.param('circle_post_id');
        let offset = req.param('offset');
        let sql = `SELECT circle_post_comments.id as id_post_comment, circle_post_comments.body, circle_post_comments.created_at, circle_post_comments.parent_id, users.id as id_user, users.avatar, users.username, circle_posts.title as title_post FROM circle_post_comments INNER JOIN users ON circle_post_comments.user_id = users.id INNER JOIN circle_posts ON circle_post_comments.circle_post_id = circle_posts.id  WHERE circle_post_id = ${circle_post_id} LIMIT ${paginate.limit} OFFSET ${offset}`;
        con.query(sql, function (err, results) {
            if (err) {
                return res.status(404).render('errors/404', {title: 'errors'});
            }

            results.forEach(function (comment) {
                comment.created_at = moment(comment.created_at).fromNow();
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