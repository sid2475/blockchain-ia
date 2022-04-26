# Lottery smart contract

## How to set up

### Ganache
- install Ganache GUI
- choose Quickstart (it should launch on port 7545, otherwise it needs to be configured in `truffle-config.js`)
- add contracts to deploy by choosing `truffle-config.js` file

### Metamask
- add Google Chrome extension called Metamask
- configure custom RPC with host HTTP://127.0.0.1:7545
- import accounts from the Ganache (e.g pick 2 first accounts and import them using the private keys)

### Truffle
- install truffle
- go to `./LotteryContract`
- execute command ```truffle compile```
- execute command ```truffle migrate```
- check Ganache GUI if contracts are deployed

### frontend
- go to `./lottery-frontend`
- execute command ```npm install```
- execute command ```npm start```

## How to use (flow)

### frontend
- enter 5 numbers (1 <= x <= 49)
- click on `bet` and accept the transaction in Metamask
- for now winning numbers are hardcoded (for testing purposes): 1, 11, 19, 24, 43 - pick them if You wish to win
- repeat all the steps with preferred number of accounts

### truffle console
- go to `./LotteryContract`
- execute command ```truffle console```
- execute command ```let instance = await Lottery.deployed()```
- execute command ```let accounts = await web3.eth.getAccounts()```
- execute command ```instance.drawWinningNumbers({from:accounts[0]})```

### frontend
- click `check results` with different metamask accounts

### truffle console
- execute command ```instance.payout({from:accounts[0]})```
- check accounts' balances (balance of the winner can be updated after a while)


