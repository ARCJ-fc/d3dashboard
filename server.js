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

client.keys.stream('statuses/filter', {track: '#chocolate'}, function (stream) {
	stream.on('data', function(tweet) { 
	console.log(tweet.text);
	})
	stream.on('error', function(error) {
		console.log(error);
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
	var foodArray = [];
	if (input.text.toLowerCase().search('chocolate') !== -1) {
    	// foodArray = postWall.chocolateArray;
    	foodArray.push('choco');
		console.log(postWall.chocolateArray);
    } // else if (input.text.toLowerCase().search('cake') !== -1) {
    // 	foodArray = postWall.cakeArray;
    // 	console.log('cake');
    // } else if (input.text.toLowerCase().search('cheese') !== -1) {
    // 	foodArray = postWall.cheeseArray;
    // 	console.log('cheese');
    // };
    // for (var i = 0; i < foodArray.length; i += 1) {
    // 	if(input.text.toLowerCase() === foodArray[i].text.toLowerCase()) {
    // 		foodArray[i].retweetCount += 1;
    // 		foodArray[i].voters.push(voterName);
    // 		console.log(postWall.foodArray);
    // 	}
    // }
} 
// apply regex to format text of tweet \\
// function regexFormatter (tweetText) {
// 	var regex = /\S*#(?:\[[^\]]+\]|\S+)/g;
// 	var formatter = regex.exec(tweetText);
// 	var hashtag = formatter[0];
// };


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

// // if retweet, check against IDs of existing tweets & update retweet count of match \\
// function retweetVote (tweet) {
	
// }



function requestHandler (request, response) {
	fs.readFile(__dirname + '/' + 'index.html', function(err, data) {
		if(!err) {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end('<h1>server serving</h1>')
		} else {
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.end('<h1>404 page not found</h1>');
		}
	});
}


// create server and listen at port \\

http.createServer(requestHandler).listen(5000);
console.log('Server running');





		// if(tweet.text.search('chocolate') !== -1) {
		// 	if(tweet.retweeted_status) {
		// 		var chocTweet = {
		// 			'text': tweet.text,
		// 			'tweeter name': tweet.user.screen_name,
		// 			'retweet count': tweet.retweeted_status.retweet_count
		// 		} 			}
		// 	console.log(chocTweet);
		// 	// tweets.chocArray.p
		// ush(chocTweet);
		// } else if (tweet.text.search('cake') !== -1) {
		// 	cakeArray.push(tweet);
		// } else if (tweet.text.search('cheese') !== -1) {
		// 	cheeseArray.push(tweet.text, tweet.source);
		// }
