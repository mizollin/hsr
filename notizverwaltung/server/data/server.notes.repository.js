var persistenceService = require('./persistenceService');

function Note(uuid, creationDate, isDone, title, description, dueByDate, importance) {
    this.uuid = uuid;
    this.creationDate = creationDate;
    this.title = title;
    this.description = description;
    this.dueByDate = dueByDate;
    this.importance = importance;
    this.isDone = isDone;
}

var NOTES_REPOSITORY = (function () {
    var notes = null;

    function store() {
        persistenceService.store(notes);
    }

    function load() {
        var storedNotes = persistenceService.load();
        if (storedNotes == null) {
            notes = [];
            store();
        }
        else {
            notes = storedNotes;
        }
    }

    function createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getIndexForNoteByUUID(uuid) {
        return notes.getIndexByPredicate(function (note) {
            return note.uuid === uuid;
        });
    }

    function publicInitialize() {
        persistenceService.initialize();
        load();
    }

    function publicStore() {
        store();
    }

    function publicCreateNote(note) {
        var creationDate = new Date();
        var uuid = createUUID();
        var isDone = false;

        var note = new Note(uuid, creationDate, isDone, note.title, note.description, note.dueByDate, note.importance);

        notes.push(note);
        publicStore();
    }

    function publicUpdateNote(note) {
        // to be implemented...
        // uuid of the note to be updated should be contained in the given note...
    }

    function publicDeleteNote(uuid) {
        var index = getIndexForNoteByUUID(uuid);
        if (index === -1) {
            return false;
        }
        else {
            notes.splice(index, 1);

            publicStore();

            return true;
        }
    }

    function publicGetNotes() {
        // should return a copy?
        return notes;
    }

    return {
        initialize: publicInitialize,
        store: publicStore,
        createNote: publicCreateNote,
        updateNote: publicUpdateNote,
        deleteNote: publicDeleteNote,
        getNotes: publicGetNotes,
    };
})();

module.exports = {NotesRepository: NOTES_REPOSITORY, Note: Note};