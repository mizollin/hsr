
var page_handler = (function() {

    var self = this;

    self.privateDetailsController;

    function bubbledEventHandler(e) {
        var targetID = e.target.id;
        console.log(targetID);

        switch (targetID) {
            case CONSTANTS.ID_SAVE:
                self.privateDetailsController.save();

                return false;
                break;
            case CONSTANTS.ID_CANCEL:
                self.privateDetailsController.cancel();

                return false;
                break;
            case CONSTANTS.ID_THEME_SWITCH_CB:
                self.privateDetailsController.setTheme($(e.target).val());
                break;
            default :
                console.log("not handled here!");
        }
    }

    function publicInitialize(controller) {

        self.privateDetailsController = controller;

        $("#wrapper").on("click", bubbledEventHandler);
        $("#theme-switch-cb").on("change", bubbledEventHandler);
    }

    return {
        initialize: publicInitialize,
    };
})();