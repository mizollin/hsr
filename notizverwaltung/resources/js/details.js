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
    storeNote(newNote);

    console.log("changing window location...");
    window.location = LOCATION_OVERVIEW;

    return false;
}

function cancel() {
    console.log("cancel() called");

    // NOTE: replace does not work, but i haven't really found the exact reason for it...
    //window.location.replace("overview.html");
    window.location = "overview.html";
    return false;
}

function createNewNoteObjectFromInput() {
    console.log("createNewNoteObjectFromInput() called");

    return {
        uuid: createUUID(),
        title: $("#" + ID_NOTE_DETAILS_TITLE).val(),
        description: $("#" + ID_NOTE_DETAILS_DESCRIPTION).val(),
        importance: getCheckedRadioValue($("#" + ID_NOTE_DETAILS_IMPORTANCE).val()),
        dueBy: $("#" + ID_NOTE_DETAILS_DUE_BY).val(),
        creationDate: new Date(),
        finished: false
    };
}

function getCheckedRadioValue(radios) {
    console.log("getCheckedRadioValue() called");
    console.log(radios);

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}