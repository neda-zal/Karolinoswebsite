// jshint esversion:10

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
var session = require('express-session');

// models
var Events = require('./models/events.js');
var Proceduros = require('./models/proceduros.js');


const app = express();
var jsonParser = bodyParser.json();
// for 304
app.disable('etag');

app.use(bodyParser.json());
const router = express.Router();
app.use(morgan('dev'));

// use css and other static files
app.use(express.static('assets'));
express.static( 'path', { dotfiles: 'allow' } );
app.use(express.static(process.cwd() + '/views'));
app.use(express.static(process.cwd() + '/assets'));
app.use(express.static(__dirname + '/pavyzdziai'));
app.use(express.static(path.join(__dirname, '/')));

// setting handlebars
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
app.engine('handlebars', handlebars({
	layoutsDir: __dirname + '/views/layout',
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

// routes
app.use(require('./routes/home'));
app.use(require('./routes/pavyzdziai'));
app.use(require('./routes/success'));
app.use(require('./routes/admin'));

// session
app.use(session({
    key: 'accessToken',
    secret: 'topsecret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('server started on port ' + PORT));
