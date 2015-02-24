// initialize  variables and require modules \\

var http = require('http'),
	fs   = require('fs'),
	path = require('path')
	Twitter = require('twitter')
	client = new Twitter ({
	consumer_key: '0NE1Xoy4LOwiRuPBQYOZxAdsy',
	consumer_secret: 'FwlWrejjFsJzh57JSd1OXlVFi2djcghERQNhHWsYZkgCLKUVxZ',
	access_token_key: '281746499-SfqRkJFWWD447WgouP184FlS1EkJ6CTJajYT5G0A',
	access_token_secret: 'uzLRrD1ZAi2UgNk12kK7F6HQq4AXZNW8rG8mbsR2z6WsI'
	});

//  define how requests to the http server will be handled \\

function requestHandler(request, response){
	// fs.readFile(__dirname + '/' + 'index.html', function(err, data) {
		if(!err) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write('<h1>server serving</h1>')
			response.end(data);
		} else {
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.end('<h1>404 page not found</h1>');
		}
}


// creating twitter stream \\
// --------------------------

client.stream('statuses/filter', {track: '@founderscoders'}, function(stream) {
	stream.on('data', function(tweet) {
		console.log(tweet.text);
	});
	stream.on('error', function(error){
		console.log(error);
	});
});




// formatting data received from twitter from JSON to string \\
// ------------------------------------------------------------






// create server and listen at port \\

http.createServer(requestHandler).listen(5000);
console.log('Server running');
