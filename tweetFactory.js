var postWall = {
        stopArray   : [],
        goArray     : [],
        contArray   : []
    };

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
    var newTwText   = tweet.retweeted_status.text;
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
        'textBody'  : tweet.retweeted_status.text || tweet.text,
        'id'        : tweet.retweeted_status.id || tweet.id,
        'rT'        : tweet.retweeted_status.retweet_count || tweet.retweet_count,
        'voterName' : tweet.retweeted_status.user.screen_name || tweet.user.screen_name,
        'voters'    : []
        // hashtag : hashtag,
        };
        return callback(idea);
}
// --- end new suggestion object creation
// --------------------------------------



// *****************************************************
// *** add new tweet idea to relevant array of tweets \\
function arrayPusher (idea) {
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


// add new tweet idea to relevant array of tweets \\

function arrayPusher (input) {
    if(input.textBody.search('chocolate') !== -1) {
        postWall.stopArray.push(input);
    } else if (input.textBody.search('cake') !== -1) {
        postWall.goArray.push(input);
    } else if (input.textBody.search('cheese') !== -1) {
        postWall.contArray.push(input);
    };
}
//-----------------------------------------------------


module.exports = {
    postWall        : postWall,
	tweetChecker	: tweetChecker,
	retweetVote		: retweetVote,
	searchTweets	: searchTweets,
	postIdea		: postIdea,
	arrayPusher		: arrayPusher,
	loserCuller		: loserCuller,
	objectMiniMaker	: objectMiniMaker
}