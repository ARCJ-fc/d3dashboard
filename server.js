// initialize variables and require modules \\

var http = require('http'),
    fs   = require('fs'),
	path = require('path'),
	Twitter = require('twitter'),
	client = require('./credentials.js'),
	// idea,
	foodArray,
	postWall = {
    	chocolateArray: [],
    	cakeArray: [],
    	cheeseArray: []
    };


// creating twitter stream \\

client.keys.stream('statuses/filter', {track: 'founderscoders'}, function (stream) {
	stream.on('data', tweetChecker); 

	stream.on('error', function(error) {
		// console.log(error);
	});
});


// check if incoming tweet is original suggestion or retweet vote \\

function tweetChecker (tweet, callback) {
	// console.log('tweetchecker');
    if(tweet.retweeted_status == undefined) {
        postIdea(tweet);
    } else {
    	retweetVote(tweet);
    };
};


// loop over existing array to update retweet info \\

function retweetVote (input) {
	var newTwText = input.text.toLowerCase(),
		chocArr = postWall.chocolateArray,
		cakeArr = postWall.cakeArray,
		cheeseArr = postWall.cheeseArray;

	if (newTwText.search('chocolate') !== -1) {
		var l = chocArr.length;
		console.log('choc found');
	    for (var i = 0; i < l; i += 1) {
	    	if(newTwText.search(chocArr[i].textBody.toLowerCase()) !== -1) {
	    		console.log('choc match');
	    		chocArr[i].retweetCount += 1;	    		
	    		chocArr[i].voters.push(voterName);
	    		console.log(chocArr);
	    	}
	    }
    } else if (newTwText.search('cake') !== -1) {
		var l = cakeArr.length;
	    for (var i = 0; i < l; i += 1) {
	    	if(newTwText.search(cakeArr[i].textBody.toLowerCase()) !== -1) {
	    		console.log('cake match');
	    		cakeArr[i].retweetCount += 1;
	    		cakeArr[i].voters.push(voterName);
	    		console.log(cakeArr);
	    	}
	    }
    } else if (newTwText.search('cheese') !== -1) {
    	var l = cheeseArr.length;
	    for (var i = 0; i < l; i += 1) {
	    	if(newTwText.search(cheeseArr[i].textBody.toLowerCase()) !== -1) {
	    		console.log('cheese match');
	    		cheeseArr[i].retweetCount += 1;
	    		cheeseArr[i].voters.push(voterName);
	    		console.log(cheeseArr);
	    	}
    	};
    }
} 


// if tweet is new suggestion, create new object to be stored in array with relevant hashtag \\

function postIdea (tweet) {
	// console.log('postIdea');
	var textBody = tweet.text;
	var id = tweet.id;
    var retweetCount = 0;
    var voterName = tweet.user.screen_name;
    var voters = [];
    // var hashtag = tweet.entities.hashtags.text;

    idea = {
        'textBody' : textBody,
        'id': id,
        'retweetCount' : retweetCount,
        'voterName' : voterName,
        'voters' : voters,
        // hashtag : hashtag,
    };
	    arrayPusher(idea);
    // console.log(idea);
}


// add new tweet idea to relevant array of tweets \\

function arrayPusher (input) {
	// console.log('arrayPusher')
    if(input.textBody.search('chocolate') !== -1) {
    	postWall.chocolateArray.push(input);
    } else if (input.textBody.search('cake') !== -1) {
    	postWall.cakeArray.push(input);
    } else if (input.textBody.search('cheese') !== -1) {
    	postWall.cheeseArray.push(input);
    };
	// console.log(postWall.cheeseArray);
}


// setup server to respond to requests \\

function requestHandler (request, response) {
	if (request.url === '/tweets') {
		var ting = JSON.stringify(postWall);
		response.end(ting);
	} else {
		fs.readFile(__dirname + '/' + 'index.html', function(err, data) {
			if(!err) {
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.end(data);
				// response.end(postWall);
			} else {
				response.writeHead(404, {'Content-Type': 'text/html'});
				response.end('<h1>404 page not found</h1>');
			}
		});
	}
}


// create server and listen at port \\

http.createServer(requestHandler).listen(5000);
console.log('Server running');

// apply regex to format text of tweet \\
// function regexFormatter (tweetText) {
// 	var regex = /\S*#(?:\[[^\]]+\]|\S+)/g;
// 	var formatter = regex.exec(tweetText);
// 	console.log(formatter);
// 	var hashtag = formatter[0];
// };
