var test = require("tape"),
	twf = require("../tweetFactory");

var testObj = {
	prop1: [0, 1, 2, 3, 4, 5, 10]
};

var testObj2 = {
	stopArray	: [{}],
	goArray		: [{}],
	contArray	: [{}]
}

function filt(element) {
	return element > 2;
};

test("testing that loserCuller", function(t) {
	t.equals(typeof twf.loserCuller(20), "boolean", "returns a Boolean value,")
	t.equals(twf.loserCuller(20), false, "returns false if no rT property,");
	t.equals(twf.loserCuller({rT: "4"}), true, "coerces strings into numbers");
	t.equals(twf.loserCuller({rT: 4}), true, "correctly returns true");
	t.end();
});

test("testing objectMiniMaker 1", function(t) {
	t.equals(typeof twf.objectMiniMaker(testObj, filt), 'object', 'returns an obect');
	t.equals(twf.objectMiniMaker(testObj, filt).hasOwnProperty("prop1"), true, 'that has a same-name property as the input object');
	t.equals(typeof twf.objectMiniMaker(testObj, filt).prop1.filter, "function", 'that is an array');
	t.deepEquals(twf.objectMiniMaker(testObj, filt).prop1, [3, 4, 5, 10], 'and is correctly filtered');
	t.end();
});

test("testing objectMiniMaker 2", function(t) {
	t.equals(twf.objectMiniMaker(testObj2, twf.loserCuller).stopArray.length, 0, "correctly culls array1");
	t.equals(twf.objectMiniMaker(testObj2, twf.loserCuller).goArray.length, 0, "correctly culls array2");
	t.equals(twf.objectMiniMaker(testObj2, twf.loserCuller).contArray.length, 0, "correctly culls array3");
	t.deepEquals(twf.objectMiniMaker(testObj, filt).prop1, [3, 4, 5, 10], 'and is correctly filtered');
	t.end();
});

var testTweet = {
	id: 571314470108188700,
     id_str: '571314470108188672',
     text: 'RT @CroftMillFabric: We\'ll have this cake please... http://t.co/bhq6ey3aVF',
     source: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
     user: 
      { id: 2991209993,
        id_str: '2991209993',
        name: 'PonderThatCreations',
        screen_name: 'ponderthatcc',
        location: 'Missouri',
        url: 'http://www.ponderthatcc.com',
        description: 'The mission of PonderThat Creations and Crafts is to provide unique handcrafted jewelry and products that make people Feel Good, Look Good and Give Good!',
     retweeted_status: 
      { created_at: 'Wed Feb 25 16:57:30 +0000 2015',
        id: 570628666201395200,
        id_str: '570628666201395200',
        text: 'We\'ll have this cake please... http://t.co/bhq6ey3aVF',
        source: '<a href="http://twitter.com" rel="nofollow">Twitter Web Client</a>',
        retweet_count: 15,
        favorite_count: 18,
        retweeted: false,
     retweet_count: 0,
     favorite_count: 0,
     retweeted: false,
     timestamp_ms: '1425046958840' } }
};

test("testing retweetVote", function(t) {
	var newTwText = testTweet.user.retweeted_status.text;
	t.equals("We\'ll have this cake please... http://t.co/bhq6ey3aVF", newTwText, "tweet text stored in variable");
	t.notEquals(newTwText.search('cake'), -1, "text is present in the array");
	t.end();
});
