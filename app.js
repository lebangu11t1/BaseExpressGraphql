var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/acssets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', 'app/views');

var routes = require('./routes/web');
routes(app);

app.listen(port, function () {
    console.log(`Server is listening ${port}`)
});
