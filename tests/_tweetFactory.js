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
