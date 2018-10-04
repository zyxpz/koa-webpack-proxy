const fetch = require('request');

fetch.post({ url: 'http://localhost:8989/setting.json', form: { name: 'mxl', age: 28 } }, function (error, response, body) {
	console.log('error:', error);
	console.log('statusCode:', response && response.statusCode);
	console.log('body:', body);
});