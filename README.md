This example shows how to call the [Lemonway API](http://documentation.lemonway.fr) in NodeJs

You will have to send a [HTTP POST request (in the right format)](http://documentation.lemonway.fr/api-en/directkit/overview/requests-and-responses) to the API end point that we prepared for you.

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

[RegisterWallet]: http://documentation.lemonway.fr/api-en/directkit/manage-wallets/registerwallet-creating-a-new-wallet
[UpdateWalletDetails]: http://documentation.lemonway.fr/api-en/directkit/manage-wallets/updatewalletdetails-update-wallet-data
[GetWalletDetails]: http://documentation.lemonway.fr/api-en/directkit/manage-wallets/getwalletdetails-getting-detailed-wallet-data
[RegisterCard]: http://documentation.lemonway.fr/api-en/directkit/money-in-credit-a-wallet/by-card/registercard-linking-a-card-number-to-a-wallet-for-one-click-payment-or-rebill
[MoneyInWithCardId]: http://documentation.lemonway.fr/api-en/directkit/money-in-credit-a-wallet/by-card/moneyinwithcardid-credit-of-a-wallet-with-a-tokenized-card
[SendPayment]: http://documentation.lemonway.fr/api-en/directkit/p2p-transfer-between-wallets/sendpayment-on-us-payment-between-wallets
[RegisterIBAN]: http://documentation.lemonway.fr/api-en/directkit/money-out-debit-a-wallet-and-credit-a-bank-account/registeriban-link-an-iban-to-a-wallet
[MoneyOut]: http://documentation.lemonway.fr/api-en/directkit/money-out-debit-a-wallet-and-credit-a-bank-account/moneyout-external-fund-transfer-from-a-wallet-to-a-bank-account
