var postWall = {
	stopArray: [{"textBody": "hi", rT: 0}, {"textBody": "hi", rT: 0}, {"textBody": "hi", rT: 0}, {"textBody": "hi", rT: 1}],
	goArray: [{"textBody": "hi", rT: 3}, {"textBody": "hi", rT: 4}, {"textBody": "hi", rT: 0}, {"textBody": "hi", rT: 1}],
	continueArray: [{"textBody": "hi", rT: 1}, {"textBody": "hi", rT: 2}, {"textBody": "hi", rT: 0}, {"textBody": "hi", rT: 1}]
};

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

module.exports = {
	objectMiniMaker: objectMiniMaker,
	loserCuller: loserCuller,
	postWall: postWall
};