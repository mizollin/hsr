/**
 * Created by Stefano on 26.05.2015.
 */
function applicationModel(notes, theme, sort, showDone) {
    this.notes = [];
    this.theme = STYLESHEET_DEFAULT;
    this.sort = null;
    this.showDone = true;
}

applicationModel.prototype.store = function() {
    storeItem(STORAGE_KEY_APPLICATION_MODEL, this);
    return this;
}
applicationModel.prototype.initialize = function() {
    var am = retrieveItem(STORAGE_KEY_APPLICATION_MODEL);
    if (am === null) {
        this.store();
    }
    else {
        this.notes = am.notes;
        this.sort = am.sort;
        this.theme = am.theme;
        this.showDone = am.showDone;
    }
    return this;
}

function bootstrep() {
    var APPLICATION_MODEL = new applicationModel().initialize();
    APPLICATION_CONTROLLER.initializeTheme();
}

function storeItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function retrieveItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function getApplicationModel() {
    var am = retrieveItem(STORAGE_KEY_APPLICATION_MODEL);
    if (am === null) {
        am = new applicationModel([], STYLESHEET_DEFAULT, null, true);
        storeItem(STORAGE_KEY_APPLICATION_MODEL, am);
    }
    return am;
}

var APPLICATION_CONTROLLER = {
    createNewNote: function () {
        this.setLocation(PAGE_DETAILS);
    },
    setLocation: function (location) {
        window.location = location;
    },
    sortNotes: function (sortID) {
        APPLICATION_MODEL.sort = sortID;
        var notes = APPLICATION_MODEL.notes;

        sortNotes(notes, sortID);

        APPLICATION_MODEL.store();

        //we have to rexplicitely render the notes in order to be shown in the new sort order
        renderNotes();
    },

    addNote: function (newNote) {
        var notes = APPLICATION_MODEL.notes;
        notes.push(newNote);

        APPLICATION_MODEL.store();

        // this will also render the notes...
        this.setLocation(PAGE_OVERVIEW);
    },

    // settings theme means three things:
// 1st: replacing the stylesheet which contains the new theme
// 2nd: setting the theme also into the combo-box as a visual cue to the user
// 3rd: persisting the theme in the storage
    setTheme: function (theme) {
        // replace the stylesheet here...
        this.replaceStylesheet(theme);

        // and now store it for good measure...
        APPLICATION_MODEL.theme = theme;
        APPLICATION_MODEL.store();

        // don't forget to set the theme on the combo-box too, but only after the DOM has been loaded...
        $(function () {
            $("#" + ID_THEME_SWITCH_CB).val(theme);
        })
    },

    initializeTheme: function () {
        this.setTheme(APPLICATION_MODEL.theme);
    },

    // this function merely replaces the stylesheet in the DOM
    replaceStylesheet: function (theme) {
        if (theme === null || theme.length === 0) {
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
            var notes = APPLICATION_MODEL.notes;;
            notes.splice(index, 1);

            APPLICATION_MODEL.store();

            $("#" + uuid).remove();
            return true;
        }
    },

    getIndexForNoteByUUID: function (uuid) {
        var notes = APPLICATION_MODEL.notes;

        for (var i = 0; i < notes.length; i++) {
            if (uuid === notes[i].uuid) {
                return i;
            }
        }

        return -1;
    }
}

var APPLICATION_MODEL = new applicationModel().initialize();
bootstrep();