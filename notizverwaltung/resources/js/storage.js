/**
 * Created by Stefano on 26.05.2015.
 */
//make sure we have a local storage key...
var NOTES_KEY = "nv.notes";
var THEME_KEY = "nv.theme";

console.log("notes: " + JSON.stringify(getNotes()));
console.log("theme: " + JSON.stringify(getTheme()));

function getTheme() {
    return retrieveItem(THEME_KEY);
}

function getNotes() {
    return retrieveItem(NOTES_KEY);
}

function retrieveItem(key) {
    console.log("retrieveItem() called with name: '" + key + "'");

    var notes = JSON.parse(localStorage.getItem(key));
    if (notes === null) {
        console.log("no items with key '" + key + "' found...creating an initial (empty) item");
        localStorage.setItem(key, JSON.stringify([]));
        return retrieveItem(key);
    }

    return notes;
}

function storeNote(note) {
    console.log("storeNote() called: " + JSON.stringify(note));

    var notes = getNotes();
    notes.push(note);

    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function storeTheme(theme) {
    console.log("storeTheme() called: " + JSON.stringify(theme));

    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
}

function deleteNoteFromStorage(uuid) {
    var index = getIndexForNoteByUUID(uuid);
    var notes = getNotes();
    notes.splice(index, 1);
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function getIndexForNoteByUUID(uuid) {
    var notes = getNotes();

    for (var i = 0; i < notes.length; i++) {
        if (uuid === notes[i].uuid) {
            return i;
        }
    }

    return -1;
}

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}