/**
 * Created by Stefano on 14.06.2015.
 */
var fs = require('fs');

var FILE_NAME = "./notes.txt";

function publicInitialize() {
    fs.appendFileSync(FILE_NAME, "");
}

function publicStore(anything) {
    var jsonString = JSON.stringify(anything);
    fs.writeFileSync(FILE_NAME, jsonString);
}

function publicLoad() {
    var content = fs.readFileSync(FILE_NAME);
    if (content.length === 0) {
        return null;
    }
    else {
        return JSON.parse(content);
    }
}

module.exports = {initialize: publicInitialize, store: publicStore, load: publicLoad}
