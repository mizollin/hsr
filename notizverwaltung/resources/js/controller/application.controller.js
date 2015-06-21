
// adding a generic method to array i na fancy way, so we can operate directly on the
// array rather than having to write an "own" method...
Array.prototype.getIndexByPredicate = function (fPredicate) {
    for (var i = 0; i < this.length; ++i) {
        if (fPredicate(this[i])) {
            return i;
        }
    }
    return -1;
};


var application_controller = (function(){
    var self = this;

    //router
    self.PATH_APP_ROUTER = "../../resources/js/router/application.router.js";
    //interface
    self.PATH_APP_INTERFACE = "../../resources/js/util/application.interfaces.js";
    //modell
    self.PATH_APP_MODEL = "../../resources/js/model/application.model.js";
    //constant
    self.PATH_CONSTANT = "../../resources/js/util/application.constants.js";
    // views
    self.PAGE_OVERVIEW = "../../../pages/overview/overview.html";
    self.PAGE_DETAILS = "../../../pages/details/details.html";
    // controllers
    self.PATH_CONTROLLER_OVERVIEW = "../../../page/overview/overview.controller.js";
    self.PATH_CONTROLLER_DETAILS = "../../../page/detail/detail.controller.js";
    // handlers
    self.PATH_HANDLER_OVERVIEW = "../../../page/overview/overview.handler.js";
    self.PATH_HANDLER_DETAILS = "../../../page/detail/detail.handler.js";
    /**
     * Private
     */
    function privateAppControllerInitialize(currentPage){
        //Controllers initializing
        self.router = application_router.create();
        self.router.setPage(currentPage, privateAppInizialize);

        //Repostirory
    }

    function privateAppInizialize(){
        Interface.ensureImplements(NOTES_REPOSITORY, iRepository)
        NOTES_REPOSITORY.initialize();
        APPLICATION_MODEL.initialize(NOTES_REPOSITORY);
        page_controller.initialize(APPLICATION_MODEL);
        page_handler.initialize(page_controller);
    }

    function privateGoToPage(pageId){
        if(self.router){
            self.router.goToPage(pageId);
        }
    }

    function privateLoadScript(path){

        $.getScript( path , function( data, textStatus, jqxhr ) {
            console.log( path );
            console.log( textStatus );
            console.log( jqxhr.status );
            console.log( "Load was performed." );

        });

    }

    /**
     * Public
     */
    function publicInitialize(currentPage) {
       privateAppControllerInitialize(currentPage);

    }

    function publicGoToPage(pageId) {
        privateGoToPage(pageId);
    }

    function publicStartLoadScript(){
        privateLoadScript(self.PATH_CONSTANT);
        privateLoadScript(self.PATH_APP_INTERFACE);
        privateLoadScript(self.PATH_APP_MODEL);
    }

    return {
        initialize: publicInitialize,
        goToPage: publicGoToPage,
        loadStartScriptForPage: publicStartLoadScript
    }

})();

application_controller.loadStartScriptForPage();
