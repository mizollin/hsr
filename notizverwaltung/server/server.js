var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var config = require("./config/config.js");

var app = express();

var router = express.Router();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use("/notes", require('./routes/notesRoutes.js'));
app.use(express.static(__dirname + "/public"));
app.use(errorHandler);

app.listen(config.port, config.host);


// generic shitty error handler. but will do for now...
function errorHandler(err, req, res, next) {
    res.status(500);
    res.send(err + new Error().stack);
}

//http.createServer(app).listen(config.port);