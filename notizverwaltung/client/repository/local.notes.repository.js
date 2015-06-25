var NOTES_REPOSITORY = (function () {

    function Note(uuid, creationDate, isDone, title, description, dueByDate, importance) {
        this.uuid = uuid;
        this.creationDate = creationDate;
        this.title = title;
        this.description = description;
        this.dueByDate = dueByDate;
        this.importance = importance;
        this.isDone = isDone;
    }

    var privateNotes = null;

    function store() {
        localStorage.setItem(CONSTANTS.STORAGE_KEY_NOTES, JSON.stringify(privateNotes));
    }

    function publicInitialize() {
        var storedNotes = JSON.parse(localStorage.getItem(CONSTANTS.STORAGE_KEY_NOTES));
        privateNotes = storedNotes === null ? [] : storedNotes;
    }

    function createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getIndexForNoteByUUID(uuid) {
        return privateNotes.getIndexByPredicate(function (note) {
            return note.uuid === uuid;
        });
    }

    function publicCreateNote(note) {
        var creationDate = new Date();
        var uuid = createUUID();
        var isDone = false;

        var newNote = new Note(uuid, creationDate, isDone, note.title, note.description, note.dueByDate, note.importance);

        privateNotes.push(newNote);
        store();
    }

    function publicUpdateNote(note) {
        // to be implemented...
        // uuid of the note to be updated should be contained in the given note...
    }

    function publicDeleteNote(uuid, callback) {
        var index = getIndexForNoteByUUID(uuid);
        if (index === -1) {
            callback(false, uuid);
        }
        else {
            privateNotes.splice(index, 1);

            store();

            callback(true, uuid);
        }
    }

    function publicGetNotes() {
        return privateNotes;
    }

    return {
        initialize: publicInitialize,
        createNote: publicCreateNote,
        updateNote: publicUpdateNote,
        deleteNote: publicDeleteNote,
        getNotes: publicGetNotes,
        Note: Note
    };
})();