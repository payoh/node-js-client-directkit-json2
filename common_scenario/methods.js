// Load the config
const config = require('./config.js');

exports.RegisterWallet = function(params) {
	// Method name
	var methodName = "RegisterWallet";
	params["version"] = "1.1";
	return config.sendRequest(methodName, params);
}

exports.GetWalletDetails = function(params) {
	// Method name
	var methodName = "GetWalletDetails";
	params["version"] = "2.0";
	return config.sendRequest(methodName, params);
}

exports.UpdateWalletDetails = function(params) {
	// Method name
	var methodName = "UpdateWalletDetails";
	params["version"] = "1.0";
	return config.sendRequest(methodName, params);
}

exports.RegisterCard = function(params) {
	// Method name
	var methodName = "RegisterCard";
	params["version"] = "1.2";
	return config.sendRequest(methodName, params);
}

exports.MoneyInWithCardId = function(params) {
	// Method name
	var methodName = "MoneyInWithCardId";
	params["version"] = "1.1";
	return config.sendRequest(methodName, params);
}

exports.SendPayment = function(params) {
	// Method name
	var methodName = "SendPayment";
	params["version"] = "1.0";
	return config.sendRequest(methodName, params);
}

exports.RegisterIBAN = function(params) {
	// Method name
	var methodName = "RegisterIBAN";
	params["version"] = "1.1";
	return config.sendRequest(methodName, params);
}

exports.MoneyOut = function(params) {
	// Method name
	var methodName = "MoneyOut";
	params["version"] = "1.3";
	return config.sendRequest(methodName, params);
}