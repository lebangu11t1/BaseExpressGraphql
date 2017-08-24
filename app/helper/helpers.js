'use strict'

var con = require('../models/connection');

module.exports = {
    user_reply: function(parent_id) {
        var query = `SELECT users.*, circle_post_comments.* FROM users INNER JOIN circle_post_comments ON users.id = circle_post_comments.user_id WHERE circle_post_comments.id=${parent_id} LIMIT 1`;
        con.query(query, function (error, results, fields) {
            if (error) throw error;
            return results;
        }); 
    }
}