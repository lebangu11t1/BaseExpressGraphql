var express = require('express'),
    engine = require('ejs-locals'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    logger = require('morgan')('dev');

var con = require('./app/models/connection');
var sync = require('synchronize');
var mysqlPromise = require('promise-mysql');

var moment = require('moment');
moment.locale('fr');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/assets', express.static(__dirname + '/public'));

app.use(logger);

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

app.set('view engine', 'ejs');
app.set('views', 'app/views');

var routes = require('./routes/web');
routes(app);

app.locals.show_parent = function(parent_id) {

    var data = '';

    mysqlPromise.createConnection({
        host: '192.168.0.253',
        user: 'VNCHATAPP',
        password: 'cJoHAa9bJoHAPj6X98jc',
        database: 'VNCHATAPP'
    }).then(function(conn){
        var result = conn.query(`SELECT users.username, users.avatar, circle_post_comments.body 
        FROM users INNER JOIN circle_post_comments ON users.id = circle_post_comments.user_id 
        WHERE circle_post_comments.id=${parent_id} LIMIT 1`);
        conn.end();
        return result;
    }).then(function(rows){
        data = rows[0].username;
    });

    console.log(data);

    // let data = [];
    // var query = `SELECT users.username, users.avatar, circle_post_comments.body FROM users INNER JOIN circle_post_comments ON users.id = circle_post_comments.user_id WHERE circle_post_comments.id=${parent_id} LIMIT 1`;
    // con.query(query, function (error, results, fields) {
    //     if (error) throw error;
    //     data = results[0];
    // });
    // console.log(data);
}

app.listen(port, function () {
    console.log(`Server is listening ${port}`)
});
