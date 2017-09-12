This example shows how to call the [Payoh API](https://payoh.me/documentazione) in NodeJs

You will have to send a [HTTP POST request (in the right format)](https://payoh.me/documentazione/api/directkit.overview.request-response) to the API end point that we prepared for you.

You will find 2 examples here

1. Simple Example
  - Get wallet info ([GetWalletDetails])

2. Common Scenario
  - Register a Payer Wallet ([RegisterWallet])
  - Register a Receiver Wallet ([RegisterWallet])
  - Update email for Receiver Wallet ([UpdateWalletDetails])
  - Register a credit card for Payer Wallet ([RegisterCard])
  - Pay 100.00€ to Payer Wallet with the registered card ([MoneyInWithCardId])
  - Transfer 10.00€ from Payer Wallet to Receiver Wallet ([SendPayment])
  - Register an IBAN for Receiver Wallet ([RegisterIBAN])
  - Transfer 10.00€ from Receiver Wallet to the real bank account with the registered IBAN ([MoneyOut])

[RegisterWallet]: https://payoh.me/documentazione/api/directkit.wallets.register
[UpdateWalletDetails]: https://payoh.me/documentazione/api/directkit.wallets.update-details
[GetWalletDetails]: https://payoh.me/documentazione/api/directkit.wallets.get-details
[RegisterCard]: https://payoh.me/documentazione/api/directkit.moneyin.card.mi-register-card
[MoneyInWithCardId]: https://payoh.me/documentazione/api/directkit.moneyin.card.mi-with-card-id
[SendPayment]: https://payoh.me/documentazione/api/directkit.p2p.sendpayment
[RegisterIBAN]: https://payoh.me/documentazione/api/directkit.moneyout.registeriban
[MoneyOut]: https://payoh.me/documentazione/api/directkit.moneyout.moneyout
