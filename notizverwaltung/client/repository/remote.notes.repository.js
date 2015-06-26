var NOTES_REPOSITORY = (function () {

    var self = this;
    self.PATH_MODEL_NOTES = "../../resources/js/model/model.notes.js";

    self.HOST_SERVER = "http://localhost:3000/";

    self.CallBackInitialFinished;

    /*
    function Note(uuid, creationDate, isDone, title, description, dueByDate, importance) {
        this.uuid = uuid;
        this.creationDate = creationDate;
        this.title = title;
        this.description = description;
        this.dueByDate = dueByDate;
        this.importance = importance;
        this.isDone = isDone;
    }
    */

    function privateGetUrl(id){
        var links = self.server_service.links;
        for(var i = 0; i < links.length; i++) {
            if (links[i].rel == id) {
                return links[i].url;
            }
        }
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
                if(noteObj.links[i].rel ==key) {
                    return noteObj.links[i].url;
                }
            }
        }

        return url;
    }

    function privateGetNoteFromUuid(uuid) {
        for(var i = 0; i < self.server_notes.length; i++) {
            if(self.server_notes[i].id == uuid){
                /*
                var creationDate = self.server_notes[i].creationDate;
                var isDone = self.server_notes[i].isDone;
                var title = self.server_notes[i]. title;
                var description = self.server_notes[i].description;
                var dueByDate = self.server_notes[i].dueByDate;
                var importance = self.server_notes[i].importance;
                return model_factory.create(uuid, creationDate, isDone,title, description, dueByDate, importance);
                */
                return self.server_notes[i];
            }
        }
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

    function privateGetNotes(){
        console.log("repo getnotes");
        $.ajax({
            method: "GET",
            url: privateGetUrl("get notes"),
            error: privateErrorAjax,
            success: privateCallback
        });
    }

    function privatePostNote(dataNoteObj, callback){
        var request = $.ajax({
            method: "POST",
            url: privateGetUrl("add note"),
            contentType: "application/json",
            data: dataNoteObj.getValuesAsJSON(),//getValuesAsObject,//dataNoteObj.getValuesAsJSON(),
            error: privateErrorAjax,
            success: function(data, textStatus, jqXHR){
                console.log("Post Note to Server");
                if(callback){
                    callback();
                }
            }
        });
    }

    function privatePutNote(note, url, callback){
        var request = $.ajax({
            method: "PUT",
            url: url,
            contentType: 'application/json',
            data: note.getValuesAsJSON(),
            error: function(jqXHR, extStatus, errorThrown){

                privateErrorAjax(jqXHR, extStatus, errorThrown)

            },
            success: function(data, textStatus, jqXHR){
                console.log(textStatus);
                if (callback) {
                    callback();
                }
            },
        });
    }

    function  privateDeleteNote(note, url, callback){
        var request = $.ajax({
            method: "DELETE",
            url: url,
            error: function(jqXHR, textStatus, errorThrown) {
                privateErrorAjax(privateErrorAjax);
                callback(false, note.id);
            } ,
            success: function(data, textStatus, jqXHR){
                console.log(textStatus);
                callback(true, note.id);
            },
        });
    }

    function privateCreateNoteObj(title, description, dueByDate, importance) {
        var creationDate = new Date();
        var uuid = privateCreateUUID();
        var isDone = false;

        return model_factory.create(uuid, creationDate, isDone,title, description, dueByDate, importance);

    }

    function publicCreateNote(note, callback) {

        privatePostNote(note, callback);

    }

    function publicUpdateNote(note, callback) {
        privatePutNote(note, privateGetUrlFromObjByKey("update", note), callback);
        // http UPDATE request
    }

    function publicDeleteNote(uuid, callback) {
        var note = privateGetNoteFromUuid(uuid);
        privateDeleteNote(note, privateGetUrlFromObjByKey("delete", note), callback);
        // http DELETE request...
    }

    function publicGetNotes() {
        // http GET request...
        var notes = [];
        for(var i = 0; i < self.server_notes.length; i++){
            notes.push(model_factory.create(self.server_notes[i].id, self.server_notes[i].creationDate, self.server_notes[i].isDone, self.server_notes[i].title, self.server_notes[i].description, self.server_notes[i].dueByDate, self.server_notes[i].importance))
            //notes.push(self.server_notes[i]);
        }
        return notes;
    }

    function publicGetNoteById(uuid) {
        for(var i = 0; i < self.server_notes.length; i++){
            if(self.server_notes[i].id == uuid){
                 var creationDate = self.server_notes[i].creationDate;
                 var isDone = self.server_notes[i].isDone;
                 var title = self.server_notes[i]. title;
                 var description = self.server_notes[i].description;
                 var dueByDate = self.server_notes[i].dueByDate;
                 var importance = self.server_notes[i].importance;
                 return model_factory.create(uuid, creationDate, isDone,title, description, dueByDate, importance);
            }
        }
    }

    function publicCreateNoteObj(title, description, dueByDate, importance) {
        return privateCreateNoteObj(title, description, dueByDate, importance);
    }

    function publicInitialize(callback) {
        console.log("repo public initial");
        self.CallBackInitialFinished = callback;
        privateLoadNotesFromServer();
    }

    return {
        initialize: publicInitialize,
        createNote: publicCreateNote,
        updateNote: publicUpdateNote,
        deleteNote: publicDeleteNote,
        getNotes: publicGetNotes,
        Note: publicCreateNoteObj,
        GetNoteByUuid: publicGetNoteById,
    };
})();
