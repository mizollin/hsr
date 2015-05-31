/**
 * Created by Stefano on 26.05.2015.
 */
function storeItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function retrieveItem(key) {
    var item = JSON.parse(localStorage.getItem(key));
    return item;
}

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// should be a singleton really...
var APPLICATION_CONTROLLER = {
    getSort: retrieveItem(STORAGE_KEY_SORT),
    isShowDone: retrieveItem(STORAGE_KEY_SHOW_DONE),

    createNewNote: function () {
        this.setLocation(LOCATION_DETAILS);
    },

    getNotes: function () {
        return retrieveItem(STORAGE_KEY_NOTES);
    },

    getTheme: function () {
        return retrieveItem(STORAGE_KEY_THEME);
    },

    setLocation: function (location) {
        window.location = location;
    },

    sortNotes: function (sortID) {
        var notes = this.getNotes();
        sortNotes(notes, sortID);
        storeItem(STORAGE_KEY_NOTES, notes);

        //NOTE: we sort but don't store the result!

        renderNotes();
    },

    addNote: function (newNote) {
        var notes = this.getNotes();
        notes.push(newNote);
        storeItem(STORAGE_KEY_NOTES, notes);

        // this will also render the notes...
        this.setLocation(LOCATION_OVERVIEW);
    },

    // settings theme means three things:
// 1st: replacing the stylesheet which contains the new theme
// 2nd: setting the theme also into the combo-box as a visual cue to the user
// 3rd: persisting the theme in the storage
    setTheme: function (theme) {
        // replace the stylesheet here...
        this.replaceStylesheet(theme);

        // don't forget to set the theme on the combo-box too, but only after the DOM has been loaded...
        $(function () {
            $("#" + ID_THEME_SWITCH_CB).val(theme);
        })

        // and now store it for good measure...
        storeItem(STORAGE_KEY_THEME, theme);
    },

    initializeTheme: function() {
      this.setTheme(this.getTheme());
    },

    // this function merely replaces the stylesheet in the DOM
    replaceStylesheet: function (theme) {
        if (theme.length === 0) {
            return;
        }

        if (theme === VAL_THEME_DEFAULT) {
            $("#" + ID_THEME).attr("href", STYLESHEET_DEFAULT);
        }
        else if (theme === VAL_THEME_BW) {
            $("#" + ID_THEME).attr("href", STYLESHEET_BW);
        }
    },

    deleteNote: function (uuid) {
        var index = this.getIndexForNoteByUUID(uuid);
        if (index === -1) {
            return false;
        }
        else {
            var notes = this.getNotes();
            notes.splice(index, 1);
            storeItem(STORAGE_KEY_NOTES, notes);
            $("#" + uuid).remove();
            return true;
        }
    },

    getIndexForNoteByUUID: function (uuid) {
        var notes = this.getNotes();

        for (var i = 0; i < notes.length; i++) {
            if (uuid === notes[i].uuid) {
                return i;
            }
        }

        return -1;
    }
};