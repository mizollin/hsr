var dataStore = require("nedb");
var utils = require("../util/utils.js");
var models = require("../model/models.js");

var db = new dataStore({filename: "./server/data/notes.db", autoload: true});

function publicAddNote(title, description, dueByDate, importance, callback) {
    var id = utils.createUUID();
    var creationDate = new Date().toISOString();
    var isDone = false;

    var note = new models.Note(id, creationDate, isDone, title, description, dueByDate, importance);

    db.insert(note, function (err, newNote) {
        callback(err, newNote);
    });
}

function publicDelete(id, callback) {
    db.remove({_id: id}, {}, function (err, count) {
        callback(err, count);
    });
}

function publicUpdate(id, noteProperties, callback) {
    db.update({_id: id}, {
        $set: noteProperties
    }, {}, function (err, count) {
        if (err) return callback(err);
        if (callback) return publicGet(id, callback);
    });
}

function publicGet(id, callback) {
    db.findOne({_id: id}, function (err, note) {
        callback(err, note);
    });
}

function publicGetAll(callback) {
    db.find({}, function (err, notes) {
        callback(err, notes);
    });
}

module.exports = {
    add: publicAddNote,
    delete: publicDelete,
    update: publicUpdate,
    get: publicGet,
    getAll: publicGetAll,
};