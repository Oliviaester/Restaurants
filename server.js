var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants');
require('./server/config/mongoose');
var path = require('path');
mongoose.Promise = global.Promise;
app.use(express.static( __dirname + '/public/dist/public'));
require('./server/config/routes.js')(app)
app.listen(8000, function() {
    console.log("listening on port 8000");
})