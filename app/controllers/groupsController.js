"use strict";

var datetime = require('node-datetime');

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
        var sql = "SELECT * FROM circle_types ; SELECT circle_posts.*, circle_types.id,circle_types.name, users.avatar FROM circle_posts INNER JOIN circle_types ON circle_posts.circle_type_id = circle_types.id INNER JOIN users ON circle_posts.user_id = users.id WHERE circle_posts.circle_type_id = "+ id +" LIMIT "+ paginate.limit +" OFFSET 0";
        con.query(sql, function (err, results, fields) {
            if (err) throw err;

            results[1].forEach(function (post) {
                post.hours = getHourFromCurrent(post.created_at);
            });

            res.render('groups/index', {
                title:'group detail',
                clubs : results[1],
                groups : results[0]
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
        res.render('groups/reply', {title:'reply'});
    },
    
    /** 
     * [home description] 
     */
    home : function (req, res) {
        var sql = "SELECT * FROM circle_types ; SELECT circle_posts.*, circle_types.id,circle_types.name, users.avatar FROM circle_posts INNER JOIN circle_types ON circle_posts.circle_type_id = circle_types.id INNER JOIN users ON circle_posts.user_id = users.id  LIMIT "+ paginate.limit +" OFFSET 0";
        con.query(sql, function (error, results, fields) {
            if (error) throw error;

            results[1].forEach(function (post) {
                post.hours = getHourFromCurrent(post.created_at);
            });

            res.render('home', {
                groups : results[0],
                title : "home page",
                posts : results[1]
            })
        });
    },
}

function getHourFromCurrent(time) {
    // current datetime
    var dt          = datetime.create();
    var nowDate     = dt.format('Y-m-d H:M:S');

    // created_at
    var dt2         = datetime.create(time);
    var created_at  = dt2.format('Y-m-d H:M:S');

    if (nowDate >= created_at) {
        var diff = Math.abs(new Date(nowDate) - new Date(created_at));
        var hours = parseInt(diff/3600000);
    } else {
        hours = 0;
    }

    return hours;
}