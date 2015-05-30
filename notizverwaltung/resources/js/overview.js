/**
 * Created by Stefano on 25.05.2015.
 */
// fetch any data we have and fill the DOM tree...
fillDOMTreeWithNotes(getNotes());


function fillDOMTreeWithNotes(notes) {
    console.log("fillDOMTreeWithNotes() called");
    console.log(notes.length);
    console.log(notes);

    var notesElement = document.getElementById("notes");

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

    //var dueByElement = document.createElement("td");
    //var headerElement = document.createElement("td");
    //
    //parent.appendChild(dueByElement);
    //parent.appendChild(headerElement);
    //
    //createDueBy(dueByElement, note);
    //createNoteHeader(headerElement, note);
}

//function createDueBy(parent, note) {
//    var dueBy = document.createElement("h3");
//    dueBy.className = "note-due-by";
//    parent.appendChild(dueBy);
//    dueBy.innerText = note.dueBy;
//}
//
//function createNoteHeader(parent, note) {
//    var noteHeaderElement = document.createElement("div");
//    noteHeaderElement.className = "note-header";
//    parent.appendChild(noteHeaderElement);
//
//    createNoteTitle(noteHeaderElement, note);
//    createNoteImportance(noteHeaderElement, note);
//    createCrud(noteHeaderElement, note);
//}
//
//function createNoteTitle(parent, note) {
//    var noteTitle = document.createElement("h3");
//    noteTitle.className = "note-title";
//    parent.appendChild(noteTitle);
//
//    noteTitle.innerText = note.title;
//}
//
//function createNoteImportance(parent, note) {
//    var noteImportance = document.createElement("label");
//    noteImportance.className = "note-importance";
//    parent.appendChild(noteImportance);
//
//    noteImportance.innerText = note.importance;
//}
//
//function createCrud(parent, note) {
//    var crud = document.createElement("ul");
//    crud.className = "toolbar note-crud";
//    parent.appendChild(crud);
//
//    crud.innerHTML =
//        "<li><a class=\"btn\" href=\"#\"><i class=\"fa fa-pencil\"></i>&nbsp;Edit</a></li>" +
//        "<li><a class=\"btn danger\" href=\"#\" onclick=\"deleteNote('" + note.uuid + "')\"><i class=\"fa fa-trash-o\"></i>&nbsp;Delete</a>";
//}


function createSecondTableRow(parent, note) {
    var tableRow = document.createElement("tr");
    parent.appendChild(tableRow);

    tableRow.innerHTML =
        "<td><label class=\"checkbox\"><input type=\"checkbox\" " + (note.finished === true ? "checked" : "") + "/> Finished (today)</label></td>" +
        "<td><textarea readonly class=\"note-description\">" + note.description + "</textarea></td>";
}

function convertImportanceToString(importance) {
    var importanceAsString = "";
    for (var i = 0; i < importance; i++) {
        importanceAsString += "&#xf005;" + "&nbsp;";
    }

    importanceAsString = importanceAsString.replace(/&nbsp;$/, "");
    return importanceAsString;
}

function addNewNote() {
    console.log("addNewNote() called");

    window.location = "details.html";
}

function deleteNote(uuid) {
    deleteNoteFromStorage(uuid);
    var e = document.getElementById(uuid);
    e.parentNode.removeChild(e);
}