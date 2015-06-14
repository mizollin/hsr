var http = require('http');
var fs = require('fs');
var url = require('url');

var handler = function (req, res) {
    console.log(req.url);

    // cheap & dirty variant to just stream anything requested back...
    var url = req.url;
    url = "." + url;
    var stream = fs.createReadStream(url);
    stream.pipe(res);

    //if(req.url == "/pages/overview"){
    //    res.writeHead(200, {'Content-Type': 'text/html'});
    //    var stream = fs.createReadStream("./pages/overview/overview.html" );
    //    stream.pipe(res);
    //}
    //else {
    //    var url = req.url;
    //    url = "." + url;
    //    var stream = fs.createReadStream(url);
    //    stream.pipe(res);
    //}
};

var server = http.createServer(handler);
server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');