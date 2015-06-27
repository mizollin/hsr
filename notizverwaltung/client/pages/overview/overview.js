
function renderNotes(notes, tagId, state) {
    if (state == "open") {
        $(tagId).html(compiledNoteListItemTemplate(notes));
    } else {
        $(tagId).html(compiledNoteDoneListItemTemplate(notes));
    }

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

function convertImportanceToString(importance) {
    console.log("convertImportanceToString() called");

    var importanceAsString = "";
    for (var i = 0; i < parseInt(importance); i++) {
        importanceAsString += "&#xf005;" + "&nbsp;";
    }

    importanceAsString = importanceAsString.replace(/&nbsp;$/, "");
    return importanceAsString;
}

function convertTimeToDateString(time) {
    console.log("convertTimeStringToDateString() called");
    var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

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
