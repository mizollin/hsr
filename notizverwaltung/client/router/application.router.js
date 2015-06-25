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

        self.setPage = function(currentPage){
            self.currentPage = currentPage;

            console.log("router setpage");
            switch (currentPage) {
                case "overview":

                    break;
                case "details":
                    break;
                default :
                    console.log("ApplicationRouter currentPage not found");
                    break;
            }
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