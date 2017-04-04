// Install the request module: npm install request --save

// Load the request module
var request = require('request');

var urlDirectkit = "https://sandbox-api.lemonway.fr/mb/demo/dev/directkitjson2/Service.asmx/"

function sendRequest(methodName, postData, callback) {
  // Configure
  var options = {
    url: urlDirectkit + methodName,
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    json: postData
  };

  request(options, callback);
}

// Method name
var methodName = "GetWalletDetails";

// Parameters
var postData = {
  "p": {
    "wlLogin":  "society",
    "wlPass":   "123456",
    "language": "en",
    "version":  "1.9",
    "walletIp": "1.1.1.1",
    "walletUa": "Node.js Tutorial",
    "wallet":   "TEST123456"
  }
};

// Callback function
function GetWalletDetailsResult(error, response, body) {
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
      console.log(body.d.WALLET);
    }
  }
};

// Request
sendRequest(methodName, postData, GetWalletDetailsResult);
