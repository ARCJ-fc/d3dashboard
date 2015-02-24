// initialize  variables and require modules \\

var http = require('http'),
	fs   = require('fs'),
	path = require('path')
	twitter = require('Twitter')
	twitObj = new Twitter;

//  define how requests to the http server will be handled \\

function requestHandler(request, response){
	fs.readFile(__dirname + '/' + 'index.html', function(err, data) {
		if(!err) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(data);
		} else {
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.end('<h1>404 page not found</h1>');
		}
	})
}

twitObj = {(
	'user_key': placeholder
	'user_secret)key': placeholder
	'user_token': placeholder
	'user_secret_token': placeholder
	)}


// twitter API request or  stream will go here \\
// -----------------------------------






// formatting data received from twitter from JSON to string \\
// ------------------------------------------------------------






// create server and listen at port \\

http.createServer(requestHandler).listen(5000);
console.log('Server running');
