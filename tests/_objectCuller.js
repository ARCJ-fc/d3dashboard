var test = require("tape"),
	app = require("../objectCuller");

var testObj = {
	prop1: [0, 1, 2, 3, 4, 5, 10]
};

var testObj2 = app.postWall;

function filt(element) {
	return element > 2;
};

test("testing that loserCuller", function(t) {
	t.equals(typeof app.loserCuller(20), "boolean", "returns a Boolean value,")
	t.equals(app.loserCuller(20), false, "returns false if no rT property,");
	t.equals(app.loserCuller({rT: "4"}), true, "coerces strings into numbers");
	t.equals(app.loserCuller({rT: 4}), true, "correctly returns true");
	t.end();
});

test("testing objectMiniMaker 1", function(t) {
	t.equals(typeof app.objectMiniMaker(testObj, filt), 'object', 'returns an obect');
	t.equals(app.objectMiniMaker(testObj, filt).hasOwnProperty("prop1"), true, 'that has a same-name property as the input object');
	t.equals(typeof app.objectMiniMaker(testObj, filt).prop1.filter, "function", 'that is an array');
	t.deepEquals(app.objectMiniMaker(testObj, filt).prop1, [3, 4, 5, 10], 'and is correctly filtered');
	t.end();
});

test("testing objectMiniMaker 2", function(t) {
	t.equals(app.objectMiniMaker(testObj2, app.loserCuller).stopArray.length, 1, "correctly culls array1");
	t.equals(app.objectMiniMaker(testObj2, app.loserCuller).goArray.length, 3, "correctly culls array2");
	t.equals(app.objectMiniMaker(testObj2, app.loserCuller).continueArray.length, 3, "correctly culls array3");
	// t.deepEquals(app.objectMiniMaker(testObj, filt).prop1, [3, 4, 5, 10], 'and is correctly filtered');
	t.end();
});
