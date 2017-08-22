"use strict";

var con = require('../models/connection');

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
        // con.query('SELECT * FROM circle_types', function (error, results, fields) {
        //     if (error) throw error;
        //     console.log(results);
        //     res.render('groups/index', {
        //         groups : results
        //     })
        // });
        res.render('groups/index', {title:'groups'});
    },

    /**
     * [Show function]
     * 
     * @param {any} req 
     * @param {any} res 
     */
    show: function(req, res) {
        res.render('groups/show', {title:'show detail'});
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
    }
}