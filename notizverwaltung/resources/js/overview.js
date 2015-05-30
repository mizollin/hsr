/**
 * Created by Stefano on 25.05.2015.
 */
// fetch any data we have and fill the DOM tree...
function renderNotes() {
    var notes = getStoredNotes();

    var compiledNoteListItemTemplate = Handlebars.compile(document.getElementById("note-list-item-template").textContent);
    $("#notes").html(compiledNoteListItemTemplate(notes));

    console.log("renderNotes() called");
    console.log(notes.length);
    console.log(notes);

}

// importance is a number in this case, we need to convert it into a string in order to display it properly in html
// using "font-awesome"
function convertImportanceToString(importance) {
    console.log("convertImportanceToString() called");

    var importanceAsString = "";
    for (var i = 0; i < importance; i++) {
        importanceAsString += "&#xf005;" + "&nbsp;";
    }

    // use a simple regex to remove the last occurrence of a non-breaking space...it was somehow "cooler" to do it this
    // way than having a more "complex" for-loop...
    importanceAsString = importanceAsString.replace(/&nbsp;$/, "");
    return importanceAsString;
}

function addNewNote() {
    console.log("addNewNote() called");

    window.location = LOCATION_DETAILS;
}

function deleteNote(uuid) {
    console.log("deleteNote() called: " + uuid);

    var success = deleteNoteFromStorage(uuid);

    // only do this if we really removed anything from the storage...
    if (success) {
        $("#" + uuid).remove();
    }
}

function lookupNoteIDByEvent(event) {
    console.log("lookupNoteIDByEvent() called: " + event);

    var noteListItem = $(event.target).parents("." + CLASS_NOTE_LIST_ITEM);
    var noteID = noteListItem.attr("id");
    return noteID;
}

function bubbledClickEventHandler(event) {
    //takes advantage of event bubbling
    var targetID = $(event.target).attr("id");
    console.log(targetID);

    switch (targetID) {
        case ID_ADD_NEW_NOTE:
            addNewNote();
            break;
        case ID_DELETE_NOTE:
            deleteNote(lookupNoteIDByEvent(event));
            break;
        default :
            console.log("not handled here!");
    }
}