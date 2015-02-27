// **************************************************************
// check if incoming tweet is original suggestion or retweet vote 
function tweetChecker (tweet) {
    if(tweet.retweeted_status === undefined) {
        postIdea(tweet, arrayPusher);
    } else {
    	retweetVote(tweet, searchTweets);
    };
};
// --------------------


// loop over existing array to update retweet info \\
function retweetVote (input, callback) {
	var newTwText = input.text.toLowerCase(),
		chocArr = postWall.stopArray,
		cakeArr = postWall.goArray,
		cheeseArr = postWall.continueArray;

		console.log("hi");
	if (newTwText.search('chocolate') !== -1) {
		console.log("choc found");
	} else if (newTwText.search('cake') !== -1) {
		console.log("cake found");
		return callback("cake", cakeArr);
	} else if (newTwText.search('cheese') !== -1) {
		console.log("cheese found");
		return callback("cheese", cheeseArr);
	}

}

function searchTweets(term, array) {
	array.map(function(element, index) {
		if (newTwText.search(element.textBody.toLowerCase()) !== -1) {
			element.voters.push(voterName);
			console.log(term + "ele +1")
			return element.rT += 1
		}
	})
}

// ***************************************
// *** if tweet is new suggestion, create new object to be stored in array with relevant hashtag \\
function postIdea (tweet, callback) {
	var textBody 	= tweet.text,
		id 			= tweet.id,
    	rT 			= 0,
    	voterName 	= tweet.user.screen_name,
    	voters 		= [];
    // var hashtag = tweet.entities.hashtags.text;

    idea = {
        'textBody' 	: textBody,
        'id'		: id,
        'rT' 		: rT,
        'voterName' : voterName,
        'voters' 	: voters,
        // hashtag : hashtag,
    };
	    return callback(idea);
}
// --- end new suggestion object creation
// --------------------------------------



// **************************************
// *** add new tweet idea to relevant array of tweets \\
function arrayPusher (input) {
	var newTwText = input.textBody.toLowerCase();

    if (newTwText.search('chocolate') !== -1) {
    	return postWall.stopArray.push(input);
    } else if (newTwText.search('cake') !== -1) {
    	return postWall.goArray.push(input);
    } else if (newTwText.search('cheese') !== -1) {
    	return postWall.continueArray.push(input);
    };
}
// --- End adding new tweet idea
// -----------------------------



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


module.exports = {
	tweetChecker	: tweetChecker,
	retweetVote		: retweetVote,
	searchTweets	: searchTweets,
	postIdea		: postIdea,
	arrayPusher		: arrayPusher,
	loserCuller		: loserCuller,
	objectMiniMaker	: objectMiniMaker
}