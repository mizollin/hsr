/**
 * Created by Stefano on 20.06.2015.
 */

function publicNote(id, creationDate, isDone, title, description, dueByDate, importance) {
    this._id = id;
    this.creationDate = creationDate;
    this.title = title;
    this.description = description;
    this.dueByDate = dueByDate;
    this.importance = importance;
    this.isDone = isDone;
}

function publicLink(rel, url, method) {
    this.rel = rel;
    this.url = url;
    this.method = method;
}

function publicResource(entity, links) {
    this.links = links;
}
publicResource.prototype.setLinks = function (links) {
    this.links = links;
}
publicResource.prototype.getLinks = function () {
    return this.links;
}

function publicNoteResource(note, links) {
    this.id = note._id;
    this.creationDate = note.creationDate;
    this.title = note.title;
    this.description = note.description;
    this.dueByDate = note.dueByDate;
    this.importance = note.importance;
    this.isDone = note.isDone;

    this.links = links;
}
publicNoteResource.prototype = publicResource;
publicNoteResource.prototype.constructor = publicNoteResource;



module.exports = {Link: publicLink, Resource: publicResource, Note: publicNote, NoteResource: publicNoteResource};