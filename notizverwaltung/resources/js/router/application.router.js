/**
 * Created by mi on 18.06.2015.
 */
var application_router = (function(){
    function router() {
        var self = this;

        self.PAGE_OVERVIEW = "../../pages/overview/overview.html";
        self.PAGE_DETAILS = "../../pages/details/details.html";
        self.PATH_OVERVIEW = "../../pages/overview/overview.js";
        self.PATH_DETAILS = "../../pages/details/details.js";
        self.PATH_CONTROLLER_OVERVIEW = "../../pages/overview/overview.controller.js";
        self.PATH_CONTROLLER_DETAILS = "../../pages/details/details.controller.js";
        self.PATH_HANDLER_OVERVIEW = "../../pages/overview/overview.handler.js";
        self.PATH_HANDLER_DETAILS = "../../pages/details/details.handler.js";
        self.Pages = {};
        self.Pages.overview = {page: self.PAGE_OVERVIEW, controller: self.PATH_CONTROLLER_OVERVIEW, handler: self.PATH_HANDLER_OVERVIEW};
        self.Pages.details = {page: self.PAGE_DETAILS, controller: self.PATH_CONTROLLER_DETAILS, handler: self.PATH_HANDLER_DETAILS};

        self.setPage = function(currentPage, callback){
            switch (currentPage) {
                case "overview":
                    self.loadScript(self.PATH_OVERVIEW, callback);
                    self.loadScript(self.PATH_CONTROLLER_OVERVIEW, callback);
                    self.loadScript(self.PATH_HANDLER_OVERVIEW, callback);

                    break;
                case "details":
                    self.loadScript(self.PATH_DETAILS, callback);
                    self.loadScript(self.PATH_CONTROLLER_DETAILS, callback);
                    self.loadScript(self.PATH_HANDLER_DETAILS, callback);
                    break;
                default :
                    console.log("ApplicationRouter currentPage not found");
                    break;
            }
        }

        self.loadScript = function(path, callback){
            /*
            var js = document.createElement("script");

            js.type = "text/javascript";
            js.src = path;
            js.async = false;

            document.body.appendChild(js);
            */
            $.getScript( path , function( data, textStatus, jqxhr ) {
                //console.log( data );
                console.log( textStatus );
                console.log( jqxhr.status );
                console.log( "Load was performed." );

                try {
                    if(page_controller && page_handler) {
                        callback();
                    }
                } catch(e) {

                }

            });

        }

        self.goToPage = function(pageId){
            if(self.Pages[pageId]){
                window.location = self.Pages[pageId].page;
            }
        }


    }

    function createRouter() {
        return new router();
    }



    return {
        create: createRouter
    }

})();