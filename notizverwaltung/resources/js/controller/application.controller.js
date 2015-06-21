
var application_controller = (function(){
    var self = this;

    //router
    self.PATH_APP_ROUTER = "../../resources/js/router/application.router.js";
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
        privateLoadScript(self.PATH_APP_ROUTER);
    }

    return {
        initialize: publicInitialize,
        goToPage: publicGoToPage,
        loadStartScriptForPage: publicStartLoadScript
    }

})();
