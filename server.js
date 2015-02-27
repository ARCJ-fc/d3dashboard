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
	// twf = require("./tweetFactory"),

	extensions = {
	".html" : "text/html",
	".css" 	: "text/css",
	".js" 	: "application/javascript",
	".png" 	: "image/png",
	".gif" 	: "image/gif",
	".jpg" 	: "image/jpeg"
	},
	postWall = {
    	stopArray	: [],
    	goArray		: [],
    	contArray 	: []
    };
// -------------------------------------------


// ***************************
// *** creating twitter stream
client.keys.stream('statuses/filter', {track: 'chocolate, cake, cheese'}, function (stream) {
	stream.on('data', tweetChecker); 
	stream.on('error', function(error) {
		// console.log(error);
	});
});
// --- end streaming code
// ----------------------


// **************************************************************
// check if incoming tweet is original suggestion or retweet vote 
function tweetChecker (tweet) {
    if(tweet.retweeted_status === undefined) {
        postIdea(tweet, arrayPusher);
    } else {
    	retweetVote(tweet);
    };
};
// --------------------


// loop over existing array to update retweet info \\
function retweetVote (tweet) {
	var newTwText 	= tweet.retweeted_status.text;
	if (newTwText.search(/chocolate/i) !== -1) {
		searchTweets(tweet, postWall.stopArray, newTwText);
	} else if (newTwText.search(/cake/i) !== -1) {
		searchTweets(tweet, postWall.goArray, newTwText);
	} else if (newTwText.search(/cheese/i) !== -1) {
		searchTweets(tweet, postWall.contArray, newTwText);
	}
};

// needs fixing
function searchTweets(tweet, array, str) {
	var x = 0;
	array.forEach(function(element) {
		if (element["textBody"].search(str) !== -1) {
			element.rT = tweet.retweeted_status.retweet_count;
			x = 1;
		}
	});

	if (x === 0) {
		postIdea(tweet, arrayPusher)
	}
}

// ***************************************
// *** if tweet is new suggestion, create new object to be stored in array with relevant hashtag \\
// textBody is in original case, with symbols etc
// rT count is 0 as postIdea is only fed tweets without a 'retweeted status'
function postIdea (tweet, callback) {

    var idea = {
        'textBody' 	: tweet.retweeted_status.text || tweet.text,
        'id'		: tweet.retweeted_status.id || tweet.id,
        'rT' 		: tweet.retweeted_status.retweet_count || tweet.retweet_count,
        'voterName' : tweet.retweeted_status.user.screen_name || tweet.user.screen_name,
        'voters' 	: []
        // hashtag : hashtag,
    	};
	    return callback(idea);
}
// --- end new suggestion object creation
// --------------------------------------



// *****************************************************
// *** add new tweet idea to relevant array of tweets \\
function arrayPusher (idea, str) {
    if (idea["textBody"].search(/chocolate/i) !== -1) {
    	return postWall.stopArray.push(idea);
    } else if (idea["textBody"].search(/cake/i) !== -1) {
    	return postWall.goArray.push(idea);
    } else if (idea["textBody"].search(/cheese/i) !== -1) {
    	return postWall.contArray.push(idea);
    };
}
// --------------------- End adding new tweet idea
// -----------------------------------------------------



// **************************************
// *** culling tweets with no retweets
function loserCuller(element) {
	return element.rT > 0;
};

function objectMiniMaker (obj, func) {
	var newObj = {};

	for (prop in obj) {
		newObj[prop] = obj[prop].filter(func)
	}

	return newObj
};
// --- End culling
// ---------------------------------


// *************************************** \\
// *** setup server to respond to requests
function myHandler (req, res) {
    var fileName 	= req.url || "index.html",
    	ext 		= path.extname(fileName) || ".html",
    	localFolder = __dirname,
    	page404 	= localFolder + "404page.html";

    if (req.url === "/tweets") {
    	var temp = objectMiniMaker(postWall, loserCuller);
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
http.createServer(myHandler).listen(5000);
console.log('Server running at port 5000');
