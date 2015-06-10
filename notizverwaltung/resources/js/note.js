/**
 * Created by Stefano on 10.06.2015.
 */

// class representing a note
function Note(uuid, creationDate, isDone, title, description, dueByDate, importance) {
    this.uuid = uuid;
    this.creationDate = creationDate;
    this.title = title;
    this.description = description;
    this.dueByDate = dueByDate;
    this.importance = importance;
    this.isDone = isDone;
}