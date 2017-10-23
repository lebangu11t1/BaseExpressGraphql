'use strict';

var mysql = require('mysql');
var configDBMysql = require('../config/database');

const db_dev = configDBMysql.mysqlprod;

var connection = mysql.createConnection({
    host     : db_dev.host,
    user     : db_dev.user,
    password : db_dev.password,
    database : db_dev.database,
    multipleStatements: true
});

connection.connect();
module.exports = connection;

