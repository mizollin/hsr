var config = require("../config/config.js");
var models = require("../model/models.js");

module.exports.getHome = function (req, res, next) {
    var selfLink = new models.Link("self", config.urlHome, "GET");
    var getNotesLink = new models.Link("get notes", config.urlNotes, "GET");
    var addNotesLink = new models.Link("add note", config.urlNotes, "POST");

    var links = [selfLink, getNotesLink, addNotesLink];

    var homeResource = new models.Resource(null, links);

    res.format({
        'application/json': function () {
            res.json(homeResource).send();
        },
    });
};