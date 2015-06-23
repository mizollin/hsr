/**
 * Created by Stefano on 25.05.2015.
 */
var DETAILS_CONTROLLER = (function(applicationModel) {

    var privateApplicationModel;

    function publicSave() {
        console.log("save() called");

        console.log("creating new note object...");
        var newNote = createNewNoteObjectFromInput();
        console.log(newNote);

        privateApplicationModel.getNotesRepository().createNote(newNote);

        // switch back to the overview page...
        window.location = CONSTANTS.PAGE_OVERVIEW;
    }

    function publicCancel() {
        console.log("cancel() called");

        window.location = CONSTANTS.PAGE_OVERVIEW;
    }

    function createNewNoteObjectFromInput() {
        console.log("createNewNoteObjectFromInput() called");

        var importance = $("[name=" + CONSTANTS.ID_NOTE_DETAILS_IMPORTANCE + "]:checked").val();
        importance = importance === undefined ? "0" : importance;

        var dueByDate = new Date($("#" + CONSTANTS.ID_NOTE_DETAILS_DUE_BY).val());

        var title = $("#" + CONSTANTS.ID_NOTE_DETAILS_TITLE).val();
        var description = $("#" + CONSTANTS.ID_NOTE_DETAILS_DESCRIPTION).val();

        //var uuid = createUUID();
        //var creationDate = new Date();
        //var isDone = false;

        //var repository = APPLICATION_MODEL.getNotesRepository();
        return new (APPLICATION_MODEL.getNotesRepository().Note)(null, null, null, title, description, dueByDate, importance);
    }

    function publicSetTheme(theme) {
        // replace the stylesheet here...
        replaceTheme(theme);

        // and now store it for good measure...
        privateApplicationModel.setTheme(theme);

        // don't forget to set the theme on the combo-box too, but only after the DOM has been loaded...
        $(function () {
            $("#" + CONSTANTS.ID_THEME_SWITCH_CB).val(theme);
        })
    }

    // this function merely replaces the stylesheet in the DOM
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

    function publicInitialize(applicationModel) {
        privateApplicationModel = applicationModel;
        publicSetTheme(privateApplicationModel.getTheme());
    }

    return {
        initialize: publicInitialize,
        setTheme: publicSetTheme,
        save: publicSave,
        cancel: publicCancel
    }
})();

var page_controller = (function(applicationModel) {

    var privateApplicationModel;

    function publicSave() {
        console.log("save() called");

        console.log("creating new note object...");
        var newNote = createNewNoteObjectFromInput();
        console.log(newNote);

        privateApplicationModel.getNotesRepository().createNote(newNote);

        // switch back to the overview page...
        application_controller.goToPage(CONSTANTS.ID_OVERVIEW);
        //window.location = CONSTANTS.PAGE_OVERVIEW;
    }

    function publicCancel() {
        console.log("cancel() called");

        window.location = CONSTANTS.PAGE_OVERVIEW;
    }

    function createNewNoteObjectFromInput() {
        console.log("createNewNoteObjectFromInput() called");

        var importance = $("[name=" + CONSTANTS.ID_NOTE_DETAILS_IMPORTANCE + "]:checked").val();
        importance = importance === undefined ? "0" : importance;

        var dueByDate = new Date($("#" + CONSTANTS.ID_NOTE_DETAILS_DUE_BY).val());

        var title = $("#" + CONSTANTS.ID_NOTE_DETAILS_TITLE).val();
        var description = $("#" + CONSTANTS.ID_NOTE_DETAILS_DESCRIPTION).val();

        //var uuid = createUUID();
        //var creationDate = new Date();
        //var isDone = false;

        //var repository = APPLICATION_MODEL.getNotesRepository();
        return APPLICATION_MODEL.getNotesRepository().Note(null, null, null, title, description, dueByDate, importance);
    }

    function publicSetTheme(theme) {
        // replace the stylesheet here...
        replaceTheme(theme);

        // and now store it for good measure...
        privateApplicationModel.setTheme(theme);

        // don't forget to set the theme on the combo-box too, but only after the DOM has been loaded...
        $(function () {
            $("#" + CONSTANTS.ID_THEME_SWITCH_CB).val(theme);
        })
    }

    // this function merely replaces the stylesheet in the DOM
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

    function publicInitialize(applicationModel) {
        privateApplicationModel = applicationModel;
        publicSetTheme(privateApplicationModel.getTheme());
    }

    return {
        initialize: publicInitialize,
        setTheme: publicSetTheme,
        save: publicSave,
        cancel: publicCancel
    }
})();