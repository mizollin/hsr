var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var config = require("../config/config.js");

var routes_Home = require("../routes/homeRoutes.js");
var routes_Notes = require("../routes/notesRoutes.js");

var app = express();

var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// our routes...
app.use("/", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use("/", routes_Home);
app.use("/notes", routes_Notes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// only serves the favicon...yet
app.use(express.static(__dirname + "/public"));

// generic shitty error handler. but will do for now...
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    var message = err.message || err;
    var stack = err.stack || new Error().stack;
    res.format({
        'text/plain': function () {
            res.send(message + "\n" + stack);
        },
    });
});

module.exports = app;