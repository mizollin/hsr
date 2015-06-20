var notesStore = require("../services/notesStore.js");
var config = require("../config/config.js");
var models = require("../model/models.js");

function createNoteResource(note) {
    var selfLink = new models.Link("self", config.urlNotes + note._id, "GET");
    var deleteLink = new models.Link("delete", config.urlNotes + note._id, "DELETE");
    var updateLink = new models.Link("update", config.urlNotes + note._id, "PUT");
    var createLink = new models.Link("create", config.urlNotes, "POST");

    var links = [selfLink, deleteLink, updateLink, createLink];

    return new models.NoteResource(note, links);
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
            res.status(201).location(config.urlNotes + note._id).send();
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
