/**
 * Created by Stefano on 20.06.2015.
 */

var host = "localhost";
var port = 3000;


urlHome = "http://" + host + ":" + port + "/";
urlNotes = urlHome + "notes/";

module.exports.host = host;
module.exports.port = port;
module.exports.urlHome = urlHome;
module.exports.urlNotes = urlNotes;