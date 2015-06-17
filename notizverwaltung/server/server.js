// from nodes.js...
var http = require('http');
var fs = require('fs');
var url = require('url');
var stream = require('stream');
var querystring = require("querystring");

// my one...
var notes_repo = require('./data/server.notes.repository.js');

var handler = function (req, res) {
    console.log(req.url);


    if (req.url == "/notes") {
        res.writeHead(200, {'Content-Type': 'text/plain'});

        switch (req.method) {
            case "GET":
                var jsonString = JSON.stringify(notes_repo.NotesRepository.getNotes());
                var s = new stream.Readable();
                s.pipe(res);
                s.push(jsonString);
                s.push(null);
                break;
            case "POST":
                console.log("[200] " + req.method + " to " + req.url);
                var fullBody = "";

                req.on('data', function(chunk) {
                    // append the current chunk of data to the fullBody variable
                    fullBody += chunk.toString();
                });

                req.on('end', function() {
                    // request ended -> do something with the data

                    // parse the received body data
                    var note = JSON.parse(fullBody);
                    notes_repo.NotesRepository.createNote(note);

                    res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
                    res.end();
                });
                break;
            case "DELETE":
                break;
        }
    }
    else {
        // cheap & dirty variant to just stream anything requested back...
        var url = req.url;
        url = "." + url;
        var fileStream = fs.createReadStream(url);
        fileStream.pipe(res);
    }
};

notes_repo.NotesRepository.initialize();

var server = http.createServer(handler);
server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');