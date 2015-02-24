
STEP 1

If streaming: Connect to the Twitter API using a streaming connection. Listen for events of data being emitted in the form of tweets to founders and coders that also contain one of the relevant hashtags. 

If using the REST API: create a request to the Twitter API that is triggered every <time-interval tbc> to retrieve relevant tweets.



STEP 2

When we query the Twitter API, it will return the tweet results as objects.

The key information we want to extract and save for later is:

text-body: string
hashtag: #stop/#go/#continue
num-retweets: number
original tweeter: string
voters : array
Twitter will give us the whole tweet as one string. Therefore, in order to separate out the text body from the hashtags, we will use regex.

Number of retweets, original tweeter and voters (i.e. the retweeters) are provided in the object Twitter gives us, so are simpler to access.

A key job is to distinguish between new tweets and retweets. When there is a new tweet, we want to create a new object to store that suggestion in, whereas if there is a retweet, we want to update an existing suggestion object with an increased retweet count, and the user name of the person who retweeted will be added to the list of tweeters or 'voters' of the original tweet.
Luckily, the structure of retweets is different to tweets.
The property 'retweeted_status' only exists for retweets. So we can use an 'if' statement with this property and separate the two.
Within retweet objects, there is a property 'retweet-count'. This is what we will use to increase tell how many votes a suggestion gets.

if (retweeted_status exists) {
	fetch the retweet-count
};
else (retweeted_status doesn't exist ){
	create new object
};

We can also check the ID of the tweeter to make sure the same person has not tweeted the same text in order to cheat the voting system.


STEP 3

In order to access the data properties of the JSON object we will .stringify it.

We will have to use string manipulation with regular expressions to sort out of the tweeted text e.g. remove "@founderscoders".

We will write it to the filesystem in the form of a JSON object as a series of name: value pairs. Each tweet will be written as a new file. 

There will either be a timestamp on each tweet or each file will be written in an order that easily allows whoever is reading the filesystem to easily identify which tweets are most recent and which they have already received the data from. The filename should also contain the id number of the tweet so we can easily find the right file to update if we have a retweet. 









so receive data
stringify text property
manipulate with reg ex
re-jsonify object then
write to file