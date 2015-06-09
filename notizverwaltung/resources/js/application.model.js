var AppModell = (function() {

    var PrivatModel;

    function model(notes, theme, sort, showDone) {
        this.notes = [];
        this.theme = STYLESHEET_DEFAULT;
        this.sort = null;
        this.showDone = true;
    }

    function create(notes, theme, sort, showDone) {
        //return new model(notes, theme, sort, showDone);
        PrivatModel = new model(notes, theme, sort, showDone);
    }

    function add(note){
        PrivatModel.notes.push(notes);
    }

    function model(){
        return PrivatModel;
    }

    return {
        CreateModel: create,
        AddNotes: add,
        GetModel: model
    };

})();



