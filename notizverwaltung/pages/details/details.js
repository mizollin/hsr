/**
 * Created by Stefano on 25.05.2015.
 */
$(function () {
    APPLICATION_MODEL.initialize();
    DETAILS_CONTROLLER.initialize(APPLICATION_MODEL);
    DETAILS_HANDLER.initialize(DETAILS_CONTROLLER);
});