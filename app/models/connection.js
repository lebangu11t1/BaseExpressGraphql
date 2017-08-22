'use strict';

var mysql = require('mysql');
var configDBMysql = require('../config/database');

var connection = mysql.createConnection({
    host     : configDBMysql.mysql.host,
    user     : configDBMysql.mysql.user,
    password : configDBMysql.mysql.password,
    database : configDBMysql.mysql.database
});

connection.connect();
module.exports = connection;

