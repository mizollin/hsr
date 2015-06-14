/**
 * Created by Stefano on 25.05.2015.
 */
// fetch any data we have and fill the DOM tree...
function renderNotes(notes) {
    $("#notes").html(compiledNoteListItemTemplate(notes));

    $( "li" ).each(function( index ) {
        $(this).on('dragstart', handleDragStart);
    });
}

function lookupNoteIDByEvent(event) {
    console.log("lookupNoteIDByEvent() called: " + event);

    var noteListItem = $(event.target).parents("." + CONSTANTS.CLASS_NOTE_LIST_ITEM);
    var noteID = noteListItem.attr("id");
    return noteID;
}

// importance is a number in this case, we need to convert it into a string in order to display it properly in html
// using "font-awesome"
function convertImportanceToString(importance) {
    console.log("convertImportanceToString() called");

    var importanceAsString = "";
    for (var i = 0; i < parseInt(importance); i++) {
        importanceAsString += "&#xf005;" + "&nbsp;";
    }

    // use a simple regex to remove the last occurrence of a non-breaking space...it was somehow "cooler" to do it this
    // way than having a more "complex" for-loop...
    importanceAsString = importanceAsString.replace(/&nbsp;$/, "");
    return importanceAsString;
}

function convertTimeToDateString(time) {
    console.log("convertTimeStringToDateString() called");
    var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    // for now we just set the locale hard-codedly...
    var dateString = new Date(time).toLocaleString("en-UK", options);

    return dateString;
}

function handleDragStart(e) {
    console.log("Drag Start");
    console.log(e);
}

function handleDragEnter(e) {
    console.log("Drag Enter");
    console.log(e);
}

// bootstrap...
$(function () {
    APPLICATION_MODEL.initialize();
    OVERVIEW_CONTROLLER.initialize(APPLICATION_MODEL);
    OVERVIEW_HANDLER.initialize(OVERVIEW_CONTROLLER);
});