var Twitter = require('twitter');

var client = new Twitter ({
	consumer_key: '0NE1Xoy4LOwiRuPBQYOZxAdsy',
	consumer_secret: 'FwlWrejjFsJzh57JSd1OXlVFi2djcghERQNhHWsYZkgCLKUVxZ',
	access_token_key: '281746499-SfqRkJFWWD447WgouP184FlS1EkJ6CTJajYT5G0A',
	access_token_secret: 'uzLRrD1ZAi2UgNk12kK7F6HQq4AXZNW8rG8mbsR2z6WsI'
});

exports.keys = client;