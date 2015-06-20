/**
 * Created by mi on 18.06.2015.
 */
var application_router = (function(){
    function router() {
        var self = this;

        self.PAGE_OVERVIEW = "../../../page/overview/overview.html";
        self.PAGE_DETAILS = "../../../page/detail/detail.html";
        self.PATH_OVERVIEW = "../../../page/overview/overview.js";
        self.PATH_DETAILS = "../../../page/detail/detail.js";
        self.PATH_CONTROLLER_OVERVIEW = "../../../page/overview/overview.controller.js";
        self.PATH_CONTROLLER_DETAILS = "../../../page/detail/detail.controller.js";
        self.PATH_HANDLER_OVERVIEW = "../../../page/overview/overview.handler.js";
        self.PATH_HANDLER_DETAILS = "../../../page/detail/detail.handler.js";
        self.Pages = {};
        self.Pages.overview = {page: self.PAGE_OVERVIEW, controller: self.PATH_CONTROLLER_OVERVIEW, handler: self.PATH_HANDLER_OVERVIEW};
        self.Pages.details = {page: self.PAGE_DETAILS, controller: self.PATH_CONTROLLER_DETAILS, handler: self.PATH_HANDLER_DETAILS};

        self.setPage = function(currentPage){
            switch (currentPage) {
                case "overview":
                    self.loadScript(self.PATH_CONTROLLER_OVERVIEW);
                    self.loadScript(self.PATH_HANDLER_OVERVIEW);

                    break;
                case "details":
                    self.loadScript(self.PATH_CONTROLLER_DETAILS);
                    self.loadScript(self.PATH_HANDLER_DETAILS);
                    break;
                default :
                    console.log("ApplicationRouter currentPage not found");
                    break;
            }
        }

        self.loadScript = function(path){
            var js = document.createElement("script");

            js.type = "text/javascript";
            js.src = path;

            document.body.appendChild(js);
            /*
            $.getScript( path , function( data, textStatus, jqxhr ) {
                //console.log( data );
                console.log( textStatus );
                console.log( jqxhr.status );
                console.log( "Load was performed." );

            });//.fail()(function( jqxhr, settings, exception ) {
                //$( "div.log" ).text( "Triggered ajaxError handler." );
            //});
            */
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