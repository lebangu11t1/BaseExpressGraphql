"use strict";

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
        console.log('usercontroller index');
        res.render('users/index');
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
}