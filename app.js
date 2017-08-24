var express = require('express'),
    engine = require('ejs-locals'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    logger = require('morgan')('dev');

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

app.listen(port, function () {
    console.log(`Server is listening ${port}`)
});
