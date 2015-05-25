/**
 * Created by Stefano on 25.05.2015.
 */
//make sure we have a local storage key...
var STORAGE_NAME = "notes";
console.log("storage name: " + STORAGE_NAME);

console.log("getting storage...");
var NOTES_STORAGE = getSafeStorage(STORAGE_NAME);
console.log(NOTES_STORAGE);

//console.log("creating notes from storage...");
//var NOTES = createNotesFromStorage(NOTES_STORAGE);
//console.log(NOTES);

// fetch any data we have and fill the DOM tree...
fillDOMTreeWithNotes(NOTES_STORAGE);


function fillDOMTreeWithNotes(notes) {
    console.log("fillDOMTreeWithNotes() called");
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
        "<label class=\"note-importance\">" + note.importance + "</label>" +
        "<ul class=\"toolbar note-crud\">" +
        "<li><a class=\"button-skin\" href=\"#\"><i class=\"fa fa-pencil\"></i>&nbsp;Edit</a></li>" +
        "<li><a class=\"button-skin danger\" href=\"#\"><i class=\"fa fa-trash-o\"></i>&nbsp;Delete</a></li>";

    //var dueByElement = document.createElement("td");
    //var headerElement = document.createElement("td");
    //
    //parent.appendChild(dueByElement);
    //parent.appendChild(headerElement);
    //
    //createDueBy(dueByElement, note);
    //createNoteHeader(headerElement, note);
}

function createDueBy(parent, note) {
    var dueBy = document.createElement("h3");
    dueBy.className = "note-due-by";
    parent.appendChild(dueBy);
    dueBy.innerText = note.dueBy;
}

function createNoteHeader(parent, note) {
    var noteHeaderElement = document.createElement("div");
    noteHeaderElement.className = "note-header";
    parent.appendChild(noteHeaderElement);

    createNoteTitle(noteHeaderElement, note);
    createNoteImportance(noteHeaderElement, note);
    createCrud(noteHeaderElement, note);
}

function createNoteTitle(parent, note) {
    var noteTitle = document.createElement("h3");
    noteTitle.className = "note-title";
    parent.appendChild(noteTitle);

    noteTitle.innerText = note.title;
}

function createNoteImportance(parent, note) {
    var noteImportance = document.createElement("label");
    noteImportance.className = "note-importance";
    parent.appendChild(noteImportance);

    noteImportance.innerText = note.importance;
}

function createCrud(parent, note) {
    var crud = document.createElement("ul");
    crud.className = "toolbar note-crud";
    parent.appendChild(crud);

    crud.innerHTML =
        "<li><a class=\"button-skin\" href=\"#\"><i class=\"fa fa-pencil\"></i>&nbsp;Edit</a></li>" +
        "<li><a class=\"button-skin danger\" href=\"#\"><i class=\"fa fa-trash-o\"></i>&nbsp;Delete</a></li>";
}


function createSecondTableRow(parent, note) {
    var tableRow = document.createElement("tr");
    parent.appendChild(tableRow);

    tableRow.innerHTML =
        "<td><label class=\"checkbox\"><input type=\"checkbox\" " + (note.finished === true ? "checked" : "") + "/> Finished (today)</label></td>" +
        "<td><textarea readonly class=\"note-description\">" + note.description + "</textarea></td>";
}


function getSafeStorage(storageName) {
    console.log("getSafeStorage() called with name: " + storageName);

    var notesStorage = JSON.parse(localStorage.getItem(storageName));
    if (!notesStorage) {
        console.log("no storage with name '" + storageName + "' found...creating a new one (empty)");
        localStorage.setItem(storageName, JSON.stringify([]));
        notesStorage = localStorage.getItem(storageName);
    }

    return notesStorage;
}

function addNewNote() {
    console.log("addNewNote() called");

    window.location = "details.html";
}
