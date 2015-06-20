
var application_controller = (function(){
    var self = this;

    //router
    self.PATH_APP_ROUTER = "../../resources/js/router/application.router.js";
    //constant
    self.PATH_CONSTANT = "../../resources/js/util/application.constans.js";
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
        privateLoadScript(self.PATH_CONSTANT);
        privateLoadScript(self.PATH_APP_ROUTER);
        self.router = application_router.create();
        self.router.setPage(currentPage);

        NOTES_REPOSITORY.initialize();
        APPLICATION_MODEL.initialize(NOTES_REPOSITORY);
        page_controller.initialize(APPLICATION_MODEL);
        page_handler.initialize(page_controller);

        //Repostirory
    }

    function privateLoadScript(scriptPath) {
        var js = document.createElement("script");

        js.type = "text/javascript";
        js.src = scriptPath;

        document.body.appendChild(js);
        /*
        $.getScript( scriptPath, function( data, textStatus, jqxhr ) {
            console.log( data );
            console.log( textStatus );
            console.log( jqxhr.status );
            console.log( "Load was performed." );

        });//.fail()(function( jqxhr, settings, exception ) {
            //$( "div.log" ).text( "Triggered ajaxError handler." );
        //});
        */
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

    return {
        initialize: publicInitialize,
        goToPage: publicGoToPage
    }

})();

