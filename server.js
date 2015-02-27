// ************************************************************************************************************************ \\
// new tweet comes in 	-> 	store tweet in a variable 				->	IF retweet, to retweetVote				(a -> a1)	\\
//																	->	ELSE, 		to postIdea					(b -> b1)	\\
//																															\\
// 	a1	tweet to retweetVote	->	search the tweet 						-> 	IF found, 	to searchTweets 	(a1 -> a2)	\\
//		|							for a desired keyword,					-> 	ELSE, 		do nothing.			(a1 -> end)	\\
//		|																													\\
// 	a2	|	tweet to searchTweets 	->	iterate over the relevant storage 		-> IF found, 	rT +=1			(a2 -> end)	\\
//		|	|							array for the original tweet,							& push(voter)				\\
//		|	|																												\\
//		-	-																	-> ELSE,		to (b1)			(a2 -> end)	\\
//																															\\
//	b1	tweet to postIdea	 	->	create an object for the passed tweet 										(b1 -> b2)	\\
//		|							with relevant fields, and pass that 													\\
//		|							tweet to a callback (arrayPusher),														\\
//		|																													\\
//	b2	|	tweet to arrayPusher	-> 	search the text of the tweet 			-> 	IF found, 	push to rel.	(b2 -> end)	\\
//		|	|							for the desired keyword,		 						array.						\\
//		|	|																												\\
// 		-	-																	-> ELSE, 		do nothing		(b2 -> end)	\\
// 																															\\
// ------------------------------------------------------------------------------------------------------------------------ \\

// ********************************************
// *** initialize variables and require modules 
var http 	= require('http'),
    fs   	= require('fs'),
	path 	= require('path'),
	Twitter = require('twitter'),
	client 	= require('./credentials.js'),
	twf     = require("./tweetFactory"),

	extensions = {
	".html" : "text/html",
	".css" 	: "text/css",
	".js" 	: "application/javascript",
	".png" 	: "image/png",
	".gif" 	: "image/gif",
	".jpg" 	: "image/jpeg"
	},
    myPort = process.env.PORT || 5000,
    myTimer = 1200000;

// -------------------------------------------



// ***************************
// *** creating twitter stream
client.keys.stream('statuses/filter', {track: "" + twf.searchA + "," + twf.searchB + "," + twf.searchC + "" }, function (stream) {
	stream.on('data', twf.tweetChecker);
    stream.on("error", function() {
        
    })
});
// --- end streaming code
// ----------------------


// *************************
// *** Interval timer for resetting arrays
setInterval(function() {
    return twf.postWall = {
        stopArray   : [],
        goArray     : [],
        contArray   : []
    }
}, myTimer);
// --- End interval timer
// ------------------------

// *************************************** \\
// *** setup server to respond to requests
function myHandler (req, res) {
    var fileName 	= req.url || "index.html",
    	ext 		= path.extname(fileName) || ".html",
    	localFolder = __dirname,
    	page404 	= localFolder + "404page.html";

    if (req.url === "/tweets") {
    	var temp = twf.objectMiniMaker(twf.postWall, twf.loserCuller);
    	console.log(temp);
    	var ting = JSON.stringify(temp);
    	res.end(ting);
    } else if(!extensions[ext]){
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("<html><head></head><body>The requested file type is not supported</body></html>");
    } else {
        getFile((localFolder + fileName), res, page404, extensions[ext])
    };
};

function getFile (filePath, res, page404, mimeType) {
    fs.readFile(filePath, function(err, contents) {
        if(!err) {
            res.writeHead(200, {
                "Content-type" : mimeType,
                "Content-Length" : contents.length
            });
            res.end(contents);
        } else {
            console.dir(err);
        }
    })
};
// --- end server setup
// --------------------


// *****************************************
// *** create server and listen at port 5000 
http.createServer(myHandler).listen(myPort);
console.log("Server running at port: " + myPort);
console.log("Emptying arrays every " + myTimer/60000 + "minutes");
