// Install request module: npm install request --save
// Install promise module: npm install promise --save
// Install rand-token module: npm install rand-token --save

// Load the API methods
const methods = require('./methods.js');

// Create a token generator with for a random wallet ID
const uid = require('rand-token').uid;

// Register a Payer Wallet
var payerWallet = uid(16);
var promiseRegisterPayerWallet = new Promise(function (resolve, reject) {
	methods.RegisterWallet({
		"wallet": 			payerWallet,
		"clientMail": 		payerWallet + "@payoh.me",
		"clientFirstName": 	"Payer",
		"clientLastName": 	"Payer"
	}).then(function(RegisterWalletResult) {
		console.log("\n---------- Payer Wallet created: " + payerWallet + " ----------");
		console.log(RegisterWalletResult.WALLET);
		resolve("Done.");
	});
});

// GetWalletDetails with wallet ID
var promiseGetWalletDetailsPayerWallet = new Promise(function (resolve, reject) {
	promiseRegisterPayerWallet.then(function(value) {
		methods.GetWalletDetails({
			"wallet": payerWallet
		}).then(function(GetWalletDetailsResult) {
			console.log("\n---------- Payer Wallet: " + payerWallet + " ----------");
			console.log(GetWalletDetailsResult.WALLET);
			resolve("Done.");
		});
	});
});

// Register a Receiver Wallet
var receiverWallet = uid(16);
var promiseRegisterReceiverWallet = new Promise(function (resolve, reject) {
	promiseGetWalletDetailsPayerWallet.then(function(value) {
		methods.RegisterWallet({
			"wallet": 			receiverWallet,
			"clientMail": 		receiverWallet + "@payoh.me",
			"clientFirstName": 	"Receiver",
			"clientLastName": 	"Receiver"
		}).then(function(RegisterWalletResult) {
			console.log("\n---------- Receiver Wallet created: " + receiverWallet + " ----------");
			console.log(RegisterWalletResult.WALLET);
			resolve("Done.");
		});
	});
});

// GetWalletDetails with email
var promiseGetWalletDetailsReceiverWallet = new Promise(function (resolve, reject) {
	promiseRegisterReceiverWallet.then(function(value) {
		methods.GetWalletDetails({
			"email" : receiverWallet + "@payoh.me"
		}).then(function(GetWalletDetailsResult) {
			console.log("\n---------- Receiver Wallet: " + receiverWallet + " ----------");
			console.log(GetWalletDetailsResult.WALLET);
			resolve("Done.");
		});
	});
});

// Update email for Receiver Wallet
var promiseUpdateWalletDetails =  new Promise(function (resolve, reject) {
	promiseGetWalletDetailsReceiverWallet.then(function(value) {
		methods.UpdateWalletDetails({
			"wallet": 	receiverWallet,
			"newEmail": "new_" + receiverWallet + "@payoh.me"
		}).then(function(UpdateWalletDetailsResult) {
			console.log("\n---------- Update email of Receiver: " + receiverWallet + " ----------");
			console.log(UpdateWalletDetailsResult.WALLET);
			resolve("Done.");
		});
	});
});

// Receiver Wallet with the new email
var promiseGetWalletDetailsUpdated =  new Promise(function (resolve, reject) {
	promiseUpdateWalletDetails.then(function(value) {
		methods.GetWalletDetails({
			"wallet": receiverWallet
		}).then(function(GetWalletDetailsResult) {
			console.log("\n---------- Email of Receiver " + receiverWallet + " is updated ----------");
			console.log(GetWalletDetailsResult.WALLET.EMAIL);
			resolve("Done.");
		});
	});
});

// Register a card for Payer Wallet
var promiseCardId = new Promise(function (resolve, reject) {
	promiseGetWalletDetailsUpdated.then(function(value) {
		methods.RegisterCard({
			"wallet": 		payerWallet,
			"cardType": 	"1",
		    "cardNumber": 	"5017670000006700",
		    "cardCode": 	"123",
		    "cardDate": 	"12/2026"
		}).then(function(RegisterCardResult) {
			console.log("\n---------- Card registered for Payer " + payerWallet + " ----------");
			console.log(RegisterCardResult.CARD);
			resolve(RegisterCardResult.CARD.ID);
		});
	});
});

// Pay with the registered card into Payer Wallet
var promiseMoneyInWithCardId = new Promise(function (resolve, reject) {
	promiseCardId.then(function(cardId) {
		methods.MoneyInWithCardId({
			"wallet": 		payerWallet,
			"cardId": 		cardId,
		    "amountTot": 	"100.00",
		    "amountCom": 	"10.00",
		    "comment": 		"(Node.js tuto) MoneyInWithCardId 100.00€ to Payer"
		}).then(function(MoneyInWithCardIdResult) {
			console.log("\n---------- MoneyInWithCardId: 100.00€ to Payer " +payerWallet + " ----------");
			console.log(MoneyInWithCardIdResult.TRANS);
			resolve("Done.");
		});
	});
});

// Payer Wallet after the payment with card: 100.00 - 10.00 = 90.00 (€)
var promiseGetWalletDetailsPayerWalletCredited = new Promise(function (resolve, reject) {
	promiseMoneyInWithCardId.then(function(value) {
		methods.GetWalletDetails({
			"wallet": payerWallet
		}).then(function(GetWalletDetailsResult) {
			console.log("\n---------- Payer Wallet credited: " + payerWallet + " ----------");
			console.log(GetWalletDetailsResult.WALLET.BAL);
			resolve("Done.");
		});
	});
});

// Payer send 10.00€ to Receiver
var promiseSendPayment = new Promise(function (resolve, reject) {
	promiseGetWalletDetailsPayerWalletCredited.then(function(value) {
		methods.SendPayment({
			"debitWallet": 	payerWallet,
			"creditWallet": receiverWallet,
			"amount": 		"10.00",
			"message": 		"(Node.js tuto) SendPayment 10.00€ from Payer to Receiver"
		}).then(function(SendPaymentResult) {
			console.log("\n---------- SendPayment: 10.00€ from Payer " + payerWallet + " to Receiver " + receiverWallet + " ----------");
			console.log(SendPaymentResult.TRANS_SENDPAYMENT);
			resolve("Done.");
		});
	});
});

// Payer Wallet after the transaction: 80.00€
var promiseGetWalletDetailsPayerDebited = new Promise(function (resolve, reject) {
	promiseSendPayment.then(function(value) {
		methods.GetWalletDetails({
			"wallet": payerWallet
		}).then(function(GetWalletDetailsResult) {
			console.log("\n---------- Payer Wallet debited: " + payerWallet + " ----------");
			console.log(GetWalletDetailsResult.WALLET.BAL);
			resolve("Done.");
		});
	});
});

// Receiver Wallet after the transaction: 10.00€
var promiseGetWalletDetailsReceiverCredited = new Promise(function (resolve, reject) {
	promiseGetWalletDetailsPayerDebited.then(function(value) {
		methods.GetWalletDetails({
			"wallet": receiverWallet
		}).then(function(GetWalletDetailsResult) {
			console.log("\n---------- Receiver Wallet credited: " + receiverWallet + " ----------");
			console.log(GetWalletDetailsResult.WALLET.BAL);
			resolve("Done.");
		});
	});
});

// Receiver register an IBAN
var promiseRegisterIBAN = new Promise(function (resolve, reject) {
	promiseGetWalletDetailsReceiverCredited.then(function(value) {
		methods.RegisterIBAN({
			"wallet": 	receiverWallet,
		    "holder": 	"Receiver Receiver",
		    "bic": 		"ABCDEFGHIJK",
		    "iban": 	"FR1420041010050500013M02606",
		    "dom1": 	"UNEBANQUE MONTREUIL",
		    "dom2": 	"56 rue de Lays",
		    "comment": 	"(Node.js tuto) Register IBAN"
		}).then(function(RegisterIBANResult) {
			console.log("\n---------- Receiver Wallet " + receiverWallet + " register an IBAN ----------");
			console.log(RegisterIBANResult.IBAN_REGISTER);
			resolve("Done.");
		});
	});
});

// Receiver Wallet with an IBAN registered
var promiseGetWalletDetailsReceiverIBAN = new Promise(function (resolve, reject) {
	promiseRegisterIBAN.then(function(value) {
		methods.GetWalletDetails({
			"wallet": receiverWallet
		}).then(function(GetWalletDetailsResult) {
			console.log("\n---------- IBAN of Receiver Wallet " + receiverWallet + " ----------");
			console.log(GetWalletDetailsResult.WALLET.IBANS);
			resolve(GetWalletDetailsResult.WALLET.IBANS[0].ID);
		});
	});
});

// Receiver do a Money Out with the registered IBAN
var promiseMoneyOut = new Promise(function (resolve, reject) {
	promiseGetWalletDetailsReceiverIBAN.then(function(ibanId) {
		methods.MoneyOut({
			"wallet": 			receiverWallet,
		    "amountTot": 		"10.00",
	        "message": 			"(Node.js tuto) Money Out 10.00€",
	        "ibanId": 			ibanId,
	        "autoCommission": 	"1"
		}).then(function(MoneyOutResult) {
			console.log("\n---------- Money Out: Receiver takes 10.00 € from Receiver Wallet " + receiverWallet + " ----------");
			console.log(MoneyOutResult.TRANS);
			resolve("Done.");
		});
	});
});

// Receiver Wallet after the Money Out: 0.00€
promiseMoneyOut.then(function(value) {
	methods.GetWalletDetails({
		"wallet": receiverWallet
	}).then(function(GetWalletDetailsResult) {
		console.log("\n---------- Receiver Wallet " + receiverWallet + " after Money Out ----------");
		console.log(GetWalletDetailsResult.WALLET.BAL);
	});
});