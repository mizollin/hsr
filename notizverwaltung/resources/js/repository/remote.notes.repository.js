var NOTES_REPOSITORY = (function () {

    var self = this;
    self.PATH_MODEL_NOTES = "../../resources/js/model/model.notes.js";

    self.HOST_SERVER = "http://localhost:3000/";

    self.CallBackInitialFinished;

    function Note(uuid, creationDate, isDone, title, description, dueByDate, importance) {
        this.uuid = uuid;
        this.creationDate = creationDate;
        this.title = title;
        this.description = description;
        this.dueByDate = dueByDate;
        this.importance = importance;
        this.isDone = isDone;
    }

    function privateLoadScript(path, callback){
        console.log("repo load script");
        /*
        $.getScript( path , function( data, textStatus, jqxhr ) {
            console.log( path );
            console.log( textStatus );
            console.log( jqxhr.status );
            console.log( "Load was performed." );

            callback();

        });
        */

    }

    function privateGetUrl(id){
        var links = self.server_service.links;
        for(var i = 0; i < links.length; i++) {
            if (links[i].rel == id) {
                return links[i].url;
            }
        }
    }

    function privatePostNote(dataNoteObj){
        var request = $.ajax({
            method: "POST",
            url: privateGetUrl("add note"),
            data: dataNoteObj,
            error: privateErrorAjax,
            success: function(data, textStatus, jqXHR){
                console.log("Post Note to Server");
            }
        });
    }

    function privateCreateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function privateErrorAjax(jqXHR, textStatus, errorThrown) {
        console.log("Error: " + textStatus);
        console.log(errorThrown);
    }

    function privateCallback(dataNotes, textStatus, jqXHR){
        console.log(dataNotes);
        self.server_notes = dataNotes;
        if(self.CallBackInitialFinished){
            self.CallBackInitialFinished();
        }
    }

    function privateGetNotes(){
        console.log("repo getnotes");
        $.ajax({
            method: "GET",
            url: privateGetUrl("get notes"),
            error: privateErrorAjax,
            success: privateCallback
        });
    }

    function privateAjaxStartSuccess(data, textStatus, jqXHR ){
        console.log("router ajaxstartsuccess");
        console.log(data);
        self.server_service = data;
        privateGetNotes();
    }

    function privateGetUrlFromObjByKey(key, noteObj) {
        console.log("repo get url");
        var url;
        if(noteObj.links){
            for(var i = 0; i < noteObj.links.length; i++){
                if(noteObj.links[i].rel == "update") {
                    return noteObj.links[i].url;
                }
            }
        }

        return url;
    }

    function privateLoadNotesFromServer() {
        console.log("repo loadnotesfromserver");
        var request = $.ajax({
            method: "GET",
            url: self.HOST_SERVER,
            error: privateErrorAjax,
            success: privateAjaxStartSuccess,
        });
    }

    function privatePutNote(note, url){
        var request = $.ajax({
            method: "PUT",
            url: url,
            error: privateErrorAjax,
            success: function(data, textStatus, jqXHR){
                console.log(textStatus);
            },
        });
    }

    function  privateDeleteNote(note, url){
        var request = $.ajax({
            method: "DELETE",
            url: url,
            error: privateErrorAjax,
            success: function(data, textStatus, jqXHR){
                console.log(textStatus);
            },
        });
    }

    function publicInitialize(callcBackInitialFinished) {
        console.log("repo public initial");
        self.CallBackInitialFinished = callcBackInitialFinished;
        privateLoadScript( self.PATH_MODEL_NOTES, privateLoadNotesFromServer);
        privateLoadNotesFromServer();
    }

    function publicCreateNote(note) {
        var creationDate = new Date();
        var uuid = privateCreateUUID();
        var isDone = false;

       //var newNote = model_factory.create(uuid, creationDate, isDone,note.title, note.description, note.dueByDate, note.importance);
        privatePostNote();
       // http POST request
    }

    function publicUpdateNote(note) {
        privatePutNote(note, privateGetUrlFromObjByKey("update", note));
        // http UPDATE request
    }

    function publicDeleteNote(uuid) {
        privateDeleteNote(note, privateGetUrlFromObjByKey("delete", note));
        // http DELETE request...
    }

    function publicGetNotes() {
        // http GET request...
        var notes = [];
        for(var i = 0; i < self.server_notes.length; i++){
            notes.push(self.server_notes[i]);
        }
        return notes;
    }

    return {
        initialize: publicInitialize,
        createNote: publicCreateNote,
        updateNote: publicUpdateNote,
        deleteNote: publicDeleteNote,
        getNotes: publicGetNotes,
        Note: Note
    };
})();
