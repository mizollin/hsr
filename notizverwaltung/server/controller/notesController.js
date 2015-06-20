var notesStore = require("../services/notesStore.js");
var config = require("../config/config.js");

var notesRootUrl = "http://" + config.host + ":" + config.port + "/notes/";

function Link(rel, url, method) {
    this.rel = rel;
    this.url = url;
    this.method = method;
}

function NoteResource(note, links) {
    this.note = note;
    this.links = links;
}

function createNoteResource(note) {
    var selfLink = new Link("self", notesRootUrl + note._id, "GET");
    var deleteLink = new Link("delete", notesRootUrl + note._id, "DELETE");
    var updateLink = new Link("update", notesRootUrl + note._id, "PUT");
    var createLink = new Link("create", notesRootUrl, "POST");

    var links = [selfLink, deleteLink, updateLink, createLink];

    return new NoteResource(note, links);
}

function createNoteResources(notes) {
    var resources = [];
    notes.forEach(function (note, index, notes) {
        resources.push(createNoteResource(note));
    });

    return resources;
}

module.exports.getNotes = function (req, res, next) {
    notesStore.getAll(function (err, notes) {
        if (err) return next(err);

        res.format({
            'application/json': function () {
                res.json(createNoteResources(notes)).send();
            },
        });
    });
};

module.exports.getNote = function (req, res, next) {
    notesStore.get(req.params.id, function (err, note) {
        if (err) return next(err);

        res.format({
            'application/json': function () {
                res.json(createNoteResource(note)).send();
            },
        });
    });
};

module.exports.createNote = function (req, res, next) {
    notesStore.add(
        req.body.title,
        req.body.description,
        req.body.dueByDate,
        req.body.importance
        , function (err, note) {
            if (err) return next(err);

            // returning 201 with location to the created resource...
            res.status(201).location(notesRootUrl + note._id).send();
        });
};

module.exports.updateNote = function (req, res, next) {
    var noteProperties = {
        title: req.body.title,
        description: req.body.description,
        dueByDate: req.body.dueByDate,
        importance: req.body.importance,
        isDone: req.body.isDone,
    };

    notesStore.update(req.params.id, noteProperties, function (err, note) {
        if (err) return next(err);

        res.format({
            'application/json': function () {
                res.json(createNoteResource(note)).send();
            },
        });
    });
};

module.exports.deleteNote = function (req, res, next) {
    notesStore.delete(req.params.id, function (err, count) {
        if (err) return next(err);

        // returning 204 - NO content
        // http://www.restapitutorial.com/lessons/httpmethods.html
        res.status(204).send();
    });
};
