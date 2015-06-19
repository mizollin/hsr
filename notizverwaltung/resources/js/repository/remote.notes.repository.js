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

    function publicInitialize() {
       publicGetNotes();
    }

    function publicCreateNote(note) {
       // http POST request
    }

    function publicUpdateNote(note) {
        // http UPDATE request
    }

    function publicDeleteNote(uuid) {
        // http DELETE request...
    }

    function publicGetNotes() {
        // http GET request...
    }

    return {
        initialize: publicInitialize,
        createNote: publicCreateNote,
        updateNote: publicUpdateNote,
        deleteNote: publicDeleteNote,
        getNotes: publicGetNotes,
        Note: Note,
    };
})();