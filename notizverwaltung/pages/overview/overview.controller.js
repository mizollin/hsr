/**
 * Created by Stefano on 14.06.2015.
 */

var OVERVIEW_CONTROLLER = (function (applicationModel) {

    var privateApplicationModel;

    function publicCreateNewNote() {
        window.location = CONSTANTS.PAGE_DETAILS;
    }

    function publicSortNotes(sortStrategy) {
        privateApplicationModel.sort = sortStrategy;
        var notes = privateApplicationModel.notes;

        sortNotes(notes, sortStrategy);

        privateApplicationModel.store();

        //we have to explicitly render the notes in order to be shown in the new sort order
        renderNotes();
    }

    function publicSetTheme(theme) {
        // replace the stylesheet here...
        replaceStylesheet(theme);

        // and now store it for good measure...
        privateApplicationModel.theme = theme;
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
    }

    return {
        initialize: publicInitialize,
        setTheme: publicSetTheme,
        deleteNote: publicDeleteNote,
        createNewNote: publicCreateNewNote,
    }
})();