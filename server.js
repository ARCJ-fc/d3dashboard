// initialize variables and require modules \\

var http = require('http'),
    fs   = require('fs'),
	path = require('path'),
	Twitter = require('twitter'),
	client = require('./credentials.js'),
	results;

// creating twitter stream \\

client.keys.stream('statuses/filter', {track: 'love'}, function (stream) {
	stream.on('data', function(tweet) {
		console.log(tweet);
		// results = tweet;
	});
	stream.on('error', function(error) {
		console.log(error);
	});
});


//  define how requests to the http server will be handled \\

function requestHandler(request, response){
	fs.readFile(__dirname + '/' + 'index.html', function(err, data) {
		if(!err) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write('<h1>server serving</h1>')
			response.end(results);
		} else {
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.end('<h1>404 page not found</h1>');
		}
	});
}

// formatting data received from twitter from JSON to string \\
// ------------------------------------------------------------






// create server and listen at port \\

http.createServer(requestHandler).listen(5000);
console.log('Server running');
