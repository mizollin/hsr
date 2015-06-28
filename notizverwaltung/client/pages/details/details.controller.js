
var page_controller = (function (applicationModel) {

    var privateApplicationModel;

    var noteEditUuid;

    function getFromDateObjFormatYYYYMMDD(date){
        var dateString;
        try {
            var month = "" + (date.getMonth() + 1);
            if(month.length == 1){
                month = "0" + month;
            }
            var day = "" + date.getDate();
            if(day.length == 1){
                day = "0" + day;
            }

            dateString = date.getFullYear() + "-" + month + "-" + day;

        } catch(e) {

        }

        return dateString;
    }

    function privateSetViewToEdit(note) {
        var date = new Date(note.dueByDate);
        //var month = "" + (date.getMonth() + 1);
        //if(month.length == 1){
        //    month = "0" + month;
        //}
        //var day = "" + date.getDate();
        //if(day.length == 1){
        //    day = "0" + day;
        //}
        //var dateString = date.getFullYear() + "-" + month + "-" + day;
        var dateString = getFromDateObjFormatYYYYMMDD(date);
        $("#" + CONSTANTS.ID_NOTE_DETAILS_DUE_BY).val(dateString);//new Date(note.dueByDate));
        $("#" + CONSTANTS.ID_NOTE_DETAILS_TITLE).val(note.title);
        $("#" + CONSTANTS.ID_NOTE_DETAILS_DESCRIPTION).text(note.description);

        switch (note.importance) {
            case "1":
                $("#star1").prop('checked',true);
                break;
            case "2":
                $("#star2").prop('checked',true);
                break;
            case "3":
                $("#star3").prop('checked',true);
                break;
            case "4":
                $("#star4").prop('checked',true);
                break
            case "5":
                $("#star5").prop('checked',true);
                break;
        }

    }

    function privateIsEditNote() {
        var storedNote = JSON.parse(localStorage.getItem(CONSTANTS.STORAGE_KEY_EDITNOTES));
        localStorage.removeItem(CONSTANTS.STORAGE_KEY_EDITNOTES);
        if (storedNote) {
            noteEditUuid = storedNote;
            var note = privateApplicationModel.getNotesRepository().GetNoteByUuid(storedNote);
            if (note) {
                privateSetViewToEdit(note);
            }
        } else {
            $("#" + CONSTANTS.ID_NOTE_DETAILS_DUE_BY).val(getFromDateObjFormatYYYYMMDD(new Date()));
        }
    }

    function publicSave() {
        console.log("save() called");

        var newNote = createNewNoteObjectFromInput();
        console.log(newNote);

        if (noteEditUuid) {
           console.log("edit existing note");
            newNote.uuid = noteEditUuid;

            privateApplicationModel.getNotesRepository().updateNote(newNote, goToDetail);

        } else {
            console.log("creating new note object...");
            privateApplicationModel.getNotesRepository().createNote(newNote, goToDetail);
        }

    }

    function goToDetail() {
        application_controller.goToPage(CONSTANTS.ID_OVERVIEW);
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

        return APPLICATION_MODEL.getNotesRepository().Note(title, description, dueByDate, importance);
    }

    function setComboxTheme(theme) {
        $(function () {
            $("#" + CONSTANTS.ID_THEME_SWITCH_CB).val(theme);
        })
    }

    function publicSetTheme(theme) {

        replaceTheme(theme);

        privateApplicationModel.setTheme(theme);

        setComboxTheme(theme);

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

    function publicInitialize(applicationModel) {
        privateApplicationModel = applicationModel;
        privateIsEditNote();
        publicSetTheme(privateApplicationModel.getTheme());
    }

    return {
        initialize: publicInitialize,
        setTheme: publicSetTheme,
        save: publicSave,
        cancel: publicCancel
    }
})();