/**
 * Created by Stefano on 14.06.2015.
 */
var http = require("http");
var notes_repo = require("../data/server.notes.repository.js");


var req = http.request( {hostname: "localhost", port: 1337, path : "/notes", method: "GET"}, function(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk.length);

        var json = JSON.parse(chunk);

        console.log('BODY: ' + json);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});
req.end();

var req = http.request( {hostname: "localhost", port: 1337, path : "/notes", method: "POST"}, function(res){
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk.length);

        var json = JSON.parse(chunk);

        console.log('BODY: ' + json);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

var newNote = new notes_repo.Note(null, null, null, "titel", "description", new Date(), 5);

req.write(JSON.stringify(newNote));
req.end();

