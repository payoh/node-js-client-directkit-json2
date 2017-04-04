const urlDirectkit = "https://sandbox-api.lemonway.fr/mb/demo/dev/directkitjson2/Service.asmx/"

// Load the request module
const request = require('request');
exports.Promise = require('promise');

var commonParams = {
	"wlLogin":  "society",
	"wlPass":   "123456",
	"language": "en",
	"walletIp": "1.1.1.1",
	"walletUa": "Node.js Tutorial",
}

exports.sendRequest = function(methodName, postData) {
	// Configure
	for (var param in commonParams) {
		postData[param] = commonParams[param];
	}

	var options = {
		url: urlDirectkit + methodName,
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=utf-8"
		},
		json: { "p": postData }
	};

	// Use promise to avoid callback hell
	var promise = new Promise(function (resolve, reject) {
		// Request
		request(options, function (error, response, body) {
		  if(error) {
		    // Handle request error
		    console.log(error);
		  } else if (response.statusCode != 200) {
		    // Handle HTTP error
		    console.log("Error " + response.statusCode + ": " + body.Message);
		  } else {
		    if (body.d.E) {
		      // Handle API error
		      console.log(body.d.E);
		    } else {
		      resolve(body.d);
		    }
		  }
		});
	});

	return promise;
}
