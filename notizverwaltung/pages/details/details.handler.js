/**
 * Created by Stefano on 14.06.2015.
 */
var DETAILS_HANDLER = (function() {

    var privateDetailsController;

    function bubbledEventHandler() {
        var targetID = $(event.target).attr("id");
        console.log(targetID);

        switch (targetID) {
            case CONSTANTS.ID_SAVE:
                privateDetailsController.save();

                // have to return false here since it is called from within a form...apparently that requires false to be returned...
                return false;
                break;
            case CONSTANTS.ID_CANCEL:
                privateDetailsController.cancel();

                // have to return false here since it is called from within a form...apparently that requires false to be returned...
                return false;
                break;
            case CONSTANTS.ID_THEME_SWITCH_CB:
                privateDetailsController.setTheme($(event.target).val());
                break;
            default :
                console.log("not handled here!");
        }
    }

    function publicInitialize(controller) {

        privateDetailsController = controller;

        // initialize handlers...
        $("#wrapper").on("click", bubbledEventHandler);
        $("#theme-switch-cb").on("change", bubbledEventHandler);
    }

    return {
        initialize: publicInitialize,
    };
})();

/**
 * new version
 */

var page_handler = (function() {

    var privateDetailsController;

    function bubbledEventHandler() {
        var targetID = $(event.target).attr("id");
        console.log(targetID);

        switch (targetID) {
            case CONSTANTS.ID_SAVE:
                privateDetailsController.save();

                // have to return false here since it is called from within a form...apparently that requires false to be returned...
                return false;
                break;
            case CONSTANTS.ID_CANCEL:
                privateDetailsController.cancel();

                // have to return false here since it is called from within a form...apparently that requires false to be returned...
                return false;
                break;
            case CONSTANTS.ID_THEME_SWITCH_CB:
                privateDetailsController.setTheme($(event.target).val());
                break;
            default :
                console.log("not handled here!");
        }
    }

    function publicInitialize(controller) {

        privateDetailsController = controller;

        // initialize handlers...
        $("#wrapper").on("click", bubbledEventHandler);
        $("#theme-switch-cb").on("change", bubbledEventHandler);
    }

    return {
        initialize: publicInitialize,
    };
})();