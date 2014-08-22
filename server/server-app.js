var fs = require('fs'), http = require('http'), socket = require("socket.io");
var nopt = require("nopt");



var uri = "/../webapp/cucumber-client.html";
var TestLinkAPI = require('testlink-api-client/lib/testlinkapi.js');

var ArgumentParser = require('./argument_parser/argument_parser.js');

var argParser = new ArgumentParser(process.argv);
port = argParser.getPort();

var page = fs.readFileSync(__dirname + uri);

function handler(request, response) {
	response.write(page);
	response.end();
}

var app = http.createServer(function(request, response) {
	handler(request, response);
});
app.listen(port);
console.log("Server Started on Port " + port);

var listener = socket.listen(app, {
	log : false
});

//end of socket

listener.sockets.on('connection', function(socket) {
	start(socket);
});
