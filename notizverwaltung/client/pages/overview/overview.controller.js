
var page_controller = (function (applicationModel) {

    var privateApplicationModel;

    function privateStoreUuidForEdit(uuid) {
        localStorage.setItem(CONSTANTS.STORAGE_KEY_EDITNOTES, JSON.stringify(uuid));
    }

    function privateSplitOpenDoneInArray(notes){
        var notesOpen = [];
        var notesDone = [];

        for(var i = 0; i < notes.length; i++) {
            if(notes[i].isDone == true) {
                notesDone.push(notes[i])
            } else {
                notesOpen.push(notes[i]);
            }
        }

        return {
            open: notesOpen,
            done: notesDone
        }
    }

    function publicCreateNewNote() {
         application_controller.goToPage(CONSTANTS.ID_DETAILS);
    }

    function publicSortNotes(sortStrategy) {
        privateApplicationModel.setSortStrategy(sortStrategy);
        var notes = privateApplicationModel.getNotesRepository().getNotes();

        sortNotes(notes, sortStrategy);

        var objNotes =  privateSplitOpenDoneInArray(notes);

        renderNotes(objNotes.open, "#notes", "open");
        renderNotes(objNotes.done, "#notes_done", "done");
    }

    function sortNotes(notes, sortID) {
        switch (sortID) {
            case CONSTANTS.SORT_BY_DUE_DATE:
                sortByNumber(notes, function (note) {
                    var date = new Date(note.dueByDate);
                    console.log("note: " + note.title + " >> due-by date: " + date);
                    return date.getTime();
                });
                break;
            case CONSTANTS.SORT_BY_CREATION_DATE:
                sortByNumber(notes, function (note) {
                    var date = new Date(note.creationDate);
                    console.log("note: " + note.title + " >> creation date: " + date);
                    return date.getTime();
                });
                break;
            case CONSTANTS.SORT_BY_IMPORTANCE:
                sortByNumber(notes, function (note) {
                    return parseInt(-note.importance);
                });
                break;
            default:
                // do nothing...
                return;
        }
    }

    function sortByNumber(notes, fSupplier) {
        notes.sort(function (note1, note2) {
            var n1 = fSupplier(note1)
            var n2 = fSupplier(note2)
            var result = n1 - n2;
            return result;
        });
    }

    function publicSetComboxTheme(theme){
        $(function () {
            $("#" + CONSTANTS.ID_THEME_SWITCH_CB).val(theme);
        })
    }

    function publicSetTheme(theme) {

        replaceTheme(theme);

        privateApplicationModel.setTheme(theme);

        publicSetComboxTheme(theme)

    }

    function replaceTheme(theme) {
        if (theme === null || theme.length === 0) {
            return;
        }

        if (theme === CONSTANTS.VAL_THEME_DEFAULT) {
            $("#" + CONSTANTS.ID_THEME).attr("href", CONSTANTS.STYLESHEET_DEFAULT);
        }
        else if (theme === CONSTANTS.VAL_THEME_BW) {
            $("#" + CONSTANTS.ID_THEME).attr("href", CONSTANTS.STYLESHEET_BW);
        }
    }

    function publicDeleteNoteCallback(success, uuid) {
        if (success) {
            $("#" + uuid).remove();
        }
    }

    function publicDeleteNote(uuid) {
        privateApplicationModel.getNotesRepository().deleteNote(uuid, publicDeleteNoteCallback);

    }

    function publicEditNotes(uuid) {
        privateStoreUuidForEdit(uuid);
        application_controller.goToPage(CONSTANTS.ID_DETAILS);
    }

    function publicSetOpenOrDone(state, uuid, event) {
        var tag = "#" + uuid;
        var note = APPLICATION_MODEL.getNotesRepository().GetNoteByUuid(uuid);

        if (state == "done") {
            note.setStateDone(true);
        } else {
            note.setStateDone(false);
        }

        privateApplicationModel.getNotesRepository().updateNote(note, function(){
            if(state == "done") {
                $("#notes_done").append($(tag));
            } else {
                $("#notes").append($(tag));
            }

        });
    }

    function publicInitialize(applicationModel) {
        console.log("overview cont initial");
        privateApplicationModel = applicationModel;
        publicSetTheme(privateApplicationModel.getTheme());
        var notes = privateApplicationModel.getNotesRepository().getNotes();
        var objNotes =  privateSplitOpenDoneInArray(notes);

        renderNotes(objNotes.open, "#notes", "open");
        renderNotes(objNotes.done, "#notes_done", "done");
    }

    return {
        initialize: publicInitialize,
        setTheme: publicSetTheme,
        deleteNote: publicDeleteNote,
        createNewNote: publicCreateNewNote,
        sortNotes: publicSortNotes,
        editNotes: publicEditNotes,
        setOpenOrDone: publicSetOpenOrDone
    }
})();