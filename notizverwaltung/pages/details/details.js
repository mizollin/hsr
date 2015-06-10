/**
 * Created by Stefano on 25.05.2015.
 */
// functions...
function save() {
    console.log("save() called");

    console.log("creating new note object...");
    var newNote = createNewNoteObjectFromInput();
    console.log(newNote);

    console.log("pushing note to storage...");
    APPLICATION_CONTROLLER.addNote(newNote);

    //console.log("changing window location...");
    //APPLICATION_CONTROLLER.setLocation(PAGE_OVERVIEW);

    return false;
}

function cancel() {
    console.log("cancel() called");

    APPLICATION_CONTROLLER.setLocation(PAGE_OVERVIEW);

    return false;
}

function createNewNoteObjectFromInput() {
    console.log("createNewNoteObjectFromInput() called");

    var importance = $("[name=" + ID_NOTE_DETAILS_IMPORTANCE + "]:checked").val();
    importance = importance === undefined ? "0" : importance;

    var dueByDate = new Date($("#" + ID_NOTE_DETAILS_DUE_BY).val());
    var creationDate = new Date();

    var uuid = createUUID();
    var title = $("#" + ID_NOTE_DETAILS_TITLE).val();
    var description = $("#" + ID_NOTE_DETAILS_DESCRIPTION).val();
    var isDone = false;

    return new Note(uuid, creationDate, isDone, title, description, dueByDate, importance);
}