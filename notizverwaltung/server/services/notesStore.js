var Datastore = require("nedb");

var db = new Datastore({filename: "./server/data/notes.db", autoload: true});

// NOTE: the _id field will be automatically inserted by nedb upon inserting a new 'doc'
function Note(id, creationDate, isDone, title, description, dueByDate, importance) {
    this.creationDate = creationDate;
    this.title = title;
    this.description = description;
    this.dueByDate = dueByDate;
    this.importance = importance;
    this.isDone = isDone;
}

function publicAddNote(title, description, dueByDate, importance, callback) {
    var creationDate = new Date().toISOString();
    var isDone = false;

    var note = new Note(creationDate, isDone, title, description, dueByDate, importance);

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