// ********************************************
var postWall = {
        stopArray   : [],
        goArray     : [],
        contArray   : []
    };
var searchA = "volcano",
    searchB = "grass",
    searchC = "surfing",
    search1 = new RegExp(searchA, "i"),
    search2 = new RegExp(searchB, "i"),
    search3 = new RegExp(searchC, "i");
// --------------------------------------------

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
function retweetVote (tweet, callback) {
    var newTwText   = tweet.retweeted_status.text;
    if (newTwText.search(search1) !== -1) {
        callback(tweet, postWall.stopArray, newTwText, postIdea);
    } else if (newTwText.search(search2) !== -1) {
        callback(tweet, postWall.goArray, newTwText, postIdea);
    } else if (newTwText.search(search3) !== -1) {
        callback(tweet, postWall.contArray, newTwText, postIdea);
    }
};

// needs fixing
function searchTweets(tweet, array, str, callback) {
    var x = 0;
    console.log(str);
    array.forEach(function(element) {
        if (element["textBody"].search(str) !== -1) {
            element.rT = tweet.retweeted_status.retweet_count;
            x = 1;
        }
    });

    if (x === 0) {
        callback(tweet, arrayPusher)
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
    if (idea["textBody"].search(search1) !== -1) {
        return postWall.stopArray.push(idea);
    } else if (idea["textBody"].search(search2) !== -1) {
        return postWall.goArray.push(idea);
    } else if (idea["textBody"].search(search3) !== -1) {
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
    if(input.textBody.search(search1) !== -1) {
        postWall.stopArray.push(input);
    } else if (input.textBody.search(search2) !== -1) {
        postWall.goArray.push(input);
    } else if (input.textBody.search(search3) !== -1) {
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
	objectMiniMaker	: objectMiniMaker,
    searchA         : searchA,
    searchB         : searchB,
    searchC         : searchC,
    search1         : search1,
    search2         : search2,
    search3         : search3
}