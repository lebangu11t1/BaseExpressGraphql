var express = require('express');
var engine = require('ejs-locals');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var graphqlHTTP = require('express-graphql');
var cors = require('cors');
var schema = require('graphql');

var app = express();
var port = process.env.PORT || 3000;
var logger = require('morgan')('dev');

// connect mongoose db
mongoose.connect('mongodb://localhost:27017/tokubuy');
const db = mongoose.connection;
db.on('error', () => console.log('Failed to connect to DB.'))
    .once('open', () => console.log('Connected to DB. '));

app.use(cors({origin: 'http://localhost:3000'}));
// GraphQL API
app.use('/graphql', graphqlHTTP(() => ({
    schema,
    graphiql: true,
    pretty: true
})));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/assets', express.static(__dirname + '/public'));
app.use(logger);

// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', 'app/views');

const routes = require('./routes/web');
routes(app);

app.listen(port, function () {
    console.log(`Server node graphql is listening ${port}`)
});
