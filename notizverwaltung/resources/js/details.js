/**
 * Created by Stefano on 25.05.2015.
 */

//make sure we have a local storage key...
var STORAGE_NAME = "notes";
console.log("storage name: " + STORAGE_NAME);

console.log("getting storage...");
var NOTES_STORAGE = getSafeStorage(STORAGE_NAME);
console.log(NOTES_STORAGE);

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

// functions...
function save() {
    console.log("save() called");

    console.log("creating new note object...");
    var newNote = createNewNoteObjectFromInput();
    console.log(newNote);

    console.log("pushing note to storage...");
    pushNoteToStorage(newNote);

    console.log("changing window location...");
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

    return {title: title, description: description, importance: importance, dueBy: dueBy, finished: false};
}

function pushNoteToStorage(note) {
    console.log("pushNoteToStorage() called");
    console.log(note);

    NOTES_STORAGE.push(note);
    localStorage.setItem("notes", JSON.stringify(NOTES_STORAGE));
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

function cancel() {
    console.log("cancel() called");

    // NOTE: replace does not work, but i haven't really found the exact reason for it...
    //window.location.replace("overview.html");
    window.location = "overview.html";
    return false;
}