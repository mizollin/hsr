/**
 * Created by Stefano on 31.05.2015.
 */
function bubbledEventHandler(event) {
    //takes advantage of event bubbling
    var targetID = $(event.target).attr("id");
    console.log(targetID);

    switch (targetID) {
        case ID_ADD_NEW_NOTE:
            APPLICATION_CONTROLLER.createNewNote();
            break;
        case ID_DELETE_NOTE:
            APPLICATION_CONTROLLER.deleteNote(lookupNoteIDByEvent(event));
            break;
        case ID_THEME_SWITCH_CB:
            APPLICATION_CONTROLLER.setTheme($(event.target).val());
            break;
        case ID_SORT_BY_DUE_DATE:
            APPLICATION_CONTROLLER.sortNotes(SORT_BY_DUE_DATE);
            renderNotes();
            break;
        case ID_SORT_BY_CREATION_DATE:
            APPLICATION_CONTROLLER.sortNotes(SORT_BY_CREATION_DATE);
            renderNotes();
            break;
        case ID_SORT_BY_IMPORTANCE:
            APPLICATION_CONTROLLER.sortNotes(SORT_BY_IMPORTANCE);
            renderNotes();
            break;
        default :
            console.log("not handled here!");
    }
}