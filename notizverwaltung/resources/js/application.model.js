var APPLICATION_MODEL = (function () {
    var privateModel;

    function Note(uuid, creationDate, isDone, title, description, dueByDate, importance) {
        this.uuid = uuid;
        this.creationDate = creationDate;
        this.title = title;
        this.description = description;
        this.dueByDate = dueByDate;
        this.importance = importance;
        this.isDone = isDone;
    }

    function Model() {
        this.notes = [];
        this.theme = CONSTANTS.THEME_DEFAULT;
        this.sortStrategy = null;
        this.isShowDone = true;
    }

    function storeItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function retrieveItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    function createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getIndexForNoteByUUID(uuid) {
        var notes = privateModel.notes;
        return notes.getIndexByPredicate(function (note) {
            return note.uuid === uuid;
        });
    }

    function publicInitialize() {
        privateModel = new Model();

        var storedModel = retrieveItem(CONSTANTS.STORAGE_KEY_APPLICATION_MODEL);
        if (storedModel === null) {
            publicStore();
        }
        else {
            privateModel.notes = storedModel.notes;
            privateModel.sort = storedModel.sort;
            privateModel.theme = storedModel.theme;
            privateModel.isShowDone = storedModel.isShowDone;
        }
    }

    function publicStore() {
        storeItem(CONSTANTS.STORAGE_KEY_APPLICATION_MODEL, privateModel);
    }

    function publicAddNote(note) {
        var creationDate = new Date();
        var uuid = createUUID();
        var isDone = false;

        var note = new Note(uuid, creationDate, isDone, note.title, note.description, note.dueByDate, note.importance);

        privateModel.notes.push(note);
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
            var notes = privateModel.notes;
            notes.splice(index, 1);

            publicStore();

            return true;
        }
    }

    function publicSetTheme(theme) {
        privateModel.theme = theme;
    }

    function publicGetTheme() {
        return privateModel.theme;
    }

    function publicSetSortStrategy(sortStrategy) {
        privateModel.sortStrategy = sortStrategy;
    }

    function publicGetSortStrategy() {
        return privateModel.sortStrategy;
    }

    function publicSetShowDone(showDone) {
        privateModel.isShowDone = showDone;
    }

    function publicGetShowDone() {
        return privateModel.isShowDone;
    }

    function publicGetNotes() {
        return privateModel.notes;
    }

    return {
        initialize: publicInitialize,
        store: publicStore,
        addNote: publicAddNote,
        updateNote: publicUpdateNote,
        deleteNote: publicDeleteNote,
        getNotes: publicGetNotes,
        setTheme: publicSetTheme,
        getTheme: publicGetTheme,
        setSortStrategy: publicSetSortStrategy,
        getSortStrategy: publicGetSortStrategy,
        setShowDone: publicSetShowDone,
        getShowDone: publicGetShowDone,
        Note: Note,
    };
})();