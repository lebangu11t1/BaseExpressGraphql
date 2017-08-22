"use strict";

var con = require('../models/connection');

exports.list_all_groups = function(req, res) {
    con.query('SELECT * FROM circle_types', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.render('groups/index', {
            groups : results
        })
    });
};