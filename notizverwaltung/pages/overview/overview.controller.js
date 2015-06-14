/**
 * Created by Stefano on 14.06.2015.
 */

var OVERVIEW_CONTROLLER = (function (applicationModel) {

    var privateApplicationModel;

    function publicCreateNewNote() {
        window.location = CONSTANTS.PAGE_DETAILS;
    }

    function publicSortNotes(sortStrategy) {
        privateApplicationModel.setSortStrategy(sortStrategy);
        var notes = privateApplicationModel.getNotes();

        sortNotes(notes, sortStrategy);

        privateApplicationModel.store();

        //we have to explicitly render the notes in order to be shown in the new sort order
        renderNotes(notes);
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

    function publicSetTheme(theme) {
        // replace the stylesheet here...
        replaceStylesheet(theme);

        // and now store it for good measure...
        privateApplicationModel.setTheme(theme);
        privateApplicationModel.store();

        // don't forget to set the theme on the combo-box too, but only after the DOM has been loaded...
        $(function () {
            $("#" + CONSTANTS.ID_THEME_SWITCH_CB).val(theme);
        })
    }

    // this function merely replaces the stylesheet in the DOM
    function replaceStylesheet(theme) {
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

    function publicDeleteNote(uuid) {
        var success = privateApplicationModel.deleteNote(uuid);

        if (success) {
            $("#" + uuid).remove();
        }
    }

    function publicInitialize(applicationModel) {
        privateApplicationModel = applicationModel;
        publicSetTheme(privateApplicationModel.getTheme());
        renderNotes(privateApplicationModel.getNotes());
    }

    return {
        initialize: publicInitialize,
        setTheme: publicSetTheme,
        deleteNote: publicDeleteNote,
        createNewNote: publicCreateNewNote,
        sortNotes: publicSortNotes,
    }
})();