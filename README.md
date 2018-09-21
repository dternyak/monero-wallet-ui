# monero-wallet

A web based monero interface for interacting with your Ledger wallet!

## Getting Started

Clone the repo

```
git clone git@github.com:dternyak/monero-wallet.git
```

Install it and run:

```
yarn install
yarn build
yarn dev
```

Ledger interact requires a secure port.

```
yarn add global https-proxy
https-proxy -t http://localhost:3000 -p 1234
```

A secure proxy will now serve on localhost:1234


This wallet is made possible by the amazing work done in https://github.com/mycryptohq/xmr-core



