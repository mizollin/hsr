/**
 * Created by Stefano on 26.05.2015.
 */
function getStoredTheme() {
    return retrieveItem(THEME_KEY);
}

function getStoredNotes() {
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

    var notes = getStoredNotes();
    notes.push(note);

    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

function storeTheme(theme) {
    console.log("storeTheme() called: " + JSON.stringify(theme));

    var themeString = JSON.stringify(theme);

    localStorage.setItem(THEME_KEY, themeString);
}

function deleteNoteFromStorage(uuid) {
    var index = getIndexForNoteByUUID(uuid);
    if (index === -1) {
        return false;
    }
    else {
        var notes = getStoredNotes();
        notes.splice(index, 1);
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
        return true;
    }
}

function getIndexForNoteByUUID(uuid) {
    var notes = getStoredNotes();

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