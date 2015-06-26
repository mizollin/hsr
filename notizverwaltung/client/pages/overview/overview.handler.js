/**
 * Created by Stefano on 14.06.2015.
 */
//var OVERVIEW_HANDLER = (function () {
//
//    var privateApplicationController;
//
//    function bubbledEventHandler() {
//        var targetID = $(event.target).attr("id");
//        console.log(targetID);
//
//        switch (targetID) {
//            case CONSTANTS.ID_ADD_NEW_NOTE:
//                privateApplicationController.createNewNote();
//                break;
//            case CONSTANTS.ID_DELETE_NOTE:
//                privateApplicationController.deleteNote(lookupNoteIDByEvent(event));
//                break;
//            case CONSTANTS.ID_THEME_SWITCH_CB:
//                privateApplicationController.setTheme($(event.target).val());
//                break;
//            case CONSTANTS.ID_SORT_BY_DUE_DATE:
//                privateApplicationController.sortNotes(CONSTANTS.SORT_BY_DUE_DATE);
//                break;
//            case CONSTANTS.ID_SORT_BY_CREATION_DATE:
//                privateApplicationController.sortNotes(CONSTANTS.SORT_BY_CREATION_DATE);
//                break;
//            case CONSTANTS.ID_SORT_BY_IMPORTANCE:
//                privateApplicationController.sortNotes(CONSTANTS.SORT_BY_IMPORTANCE);
//                break;
//            default :
//                console.log("not handled here!");
//        }
//    }
//
//    function publicInitialize(applicationController) {
//        console.log("overview handler initial");
//
//        privateApplicationController = applicationController;
//
//        // initialize handlers...
//        $("#wrapper").on("click", bubbledEventHandler);
//        $("#theme-switch-cb").on("change", bubbledEventHandler);
//    }
//
//    return {
//        initialize: publicInitialize,
//    };
//})();

/**
 * new version
 */

var page_handler = (function() {

    var privateApplicationController;

    function bubbledEventHandler(e) {
        var targetID = e.target.id;//$(event.target).attr("id");
        console.log(targetID);
        var edit = String.fromCharCode(160) + "Edit";
        var del = String.fromCharCode(160) + "Delete";
        if(targetID == ""){
            if (e.target.textContent == edit) {
                targetID = CONSTANTS.ID_EDIT_NOTE;
            } else if (e.target.textContent == del) { //e.target.innerText
                targetID = CONSTANTS.ID_DELETE_NOTE;
            }
        }

        switch (targetID) {
            case CONSTANTS.ID_ADD_NEW_NOTE:
                privateApplicationController.createNewNote();
                break;
            case CONSTANTS.ID_DELETE_NOTE:
                privateApplicationController.deleteNote(lookupNoteIDByEvent(event));
                break;
            case CONSTANTS.ID_THEME_SWITCH_CB:
                privateApplicationController.setTheme($(e.target).val());
                break;
            case CONSTANTS.ID_SORT_BY_DUE_DATE:
                privateApplicationController.sortNotes(CONSTANTS.SORT_BY_DUE_DATE);
                break;
            case CONSTANTS.ID_SORT_BY_CREATION_DATE:
                privateApplicationController.sortNotes(CONSTANTS.SORT_BY_CREATION_DATE);
                break;
            case CONSTANTS.ID_SORT_BY_IMPORTANCE:
                privateApplicationController.sortNotes(CONSTANTS.SORT_BY_IMPORTANCE);
                break;
            case CONSTANTS.ID_EDIT_NOTE:
                privateApplicationController.editNotes(lookupNoteIDByEvent(e));
                break;
            default :
                console.log("not handled here!");
        }
    }

    function publicInitialize(applicationController) {

        privateApplicationController = applicationController;

        // initialize handlers...
        $("#wrapper").on("click", bubbledEventHandler);
        $("#theme-switch-cb").on("change", bubbledEventHandler);
    }

    return {
        initialize: publicInitialize,
    };
})();