/**
 * Created by Stefano on 25.05.2015.
 */
// fetch any data we have and fill the DOM tree...
function renderNotes() {
    var notes = getStoredNotes();
    console.log("renderNotes() called");
    console.log(notes.length);
    console.log(notes);

    var notesElement = $("#notes")[0];

    for (var i = 0; i < notes.length; i++) {
        var noteListItem = createNoteListItem(notesElement, notes[i]);
        notesElement.appendChild(noteListItem);
    }
}

function createNoteListItem(parent, note) {
    var noteListItem = document.createElement("li");
    noteListItem.className = "note-list-item";
    noteListItem.id = note.uuid;
    parent.appendChild(noteListItem);

    createNoteTable(noteListItem, note);

    return noteListItem;
}

function createNoteTable(parent, note) {
    var table = document.createElement("table");
    table.className = "note-table";

    parent.appendChild(table);

    createFirstTableRow(table, note);
    createSecondTableRow(table, note);
}


function createFirstTableRow(parent, note) {
    var tableRow = document.createElement("tr");
    parent.appendChild(tableRow);


    tableRow.innerHTML = "" +
        "<td><h3 class=\"note-due-by\">" + note.dueBy + "</h3></td>" +
        "<td>" +
        "<div class=\"note-header\">" +
        "<h3 class=\"note-title\">" + note.title + "</h3>" +
        "<label class=\"note-importance\">" + convertImportanceToString(note.importance) + "</label>" +
        "<ul class=\"toolbar note-crud\">" +
        "<li><button class=\"btn\" href=\"#\"><i class=\"fa fa-pencil\"></i>&nbsp;Edit</button></li>" +
        "<li><button class=\"btn danger\" href=\"#\" onclick=\"deleteNote('" + note.uuid + "')\"><i class=\"fa fa-trash-o\"></i>&nbsp;Delete</button>";
}

function createSecondTableRow(parent, note) {
    var tableRow = document.createElement("tr");
    parent.appendChild(tableRow);

    tableRow.innerHTML =
        "<td><label class=\"checkbox\"><input type=\"checkbox\" " + (note.finished === true ? "checked" : "") + "/> Finished (today)</label></td>" +
        "<td><textarea readonly class=\"note-description\">" + note.description + "</textarea></td>";
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

    var noteListItem = $(event.target).parents(CLASS_NOTE_LIST_ITEM);
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