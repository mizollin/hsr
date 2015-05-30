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
    window.location = "overview.html";

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

    var title = document.getElementById("note-details-title").value;
    var description = document.getElementById("note-details-description").value;
    var dueBy = document.getElementById("note-details-due-by").value;

    var importanceRadios = document.getElementsByName("note-details-importance");
    var importance = getCheckedRadioValue(importanceRadios);

    var uuid = createUUID();
    var creationDate = new Date();

    return {uuid: uuid, title: title, description: description, importance: importance, dueBy: dueBy, finished: false, created: creationDate};
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