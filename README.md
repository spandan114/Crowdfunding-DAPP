# Crowd funding

https://user-images.githubusercontent.com/55044734/164529677-27af29f2-96d6-4ce6-bb61-c1f0c63a3beb.mp4

### Project features :bulb:

- [x] User can start a fundraising.
- [x] Anyone can contribute.
- [x] End project if targeted contribution amount reached.
- [x] Expire project if targeted amount not fulfills between deadline.
- [x] Contributors can withdraw contributed amount if project expire.
- [x] Owner need to request contributors for withdraw amount.
- [x] Owner can withdraw amount if 50% contributors agree.
- [x] Connect with waller.


### Tech stack & packages used 📦

| package                                                             | explain                                                               |
| ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/docs/getting-started)                  | For building frontend                                                 |
| [solidity](https://docs.soliditylang.org/en/v0.8.13/)               | For writting smart contracts                                          |
| [tailwind css](https://tailwindcss.com/docs/installation)           | For building design                                                   |       
| [ether.js](https://docs.ethers.io/v5/)                              | Web3 client (contract testing ).                                      |
| [web3.js](https://www.npmjs.com/package/web3)                       | Web3 client (Frontend Next.js).                                       |
| [Chai](https://www.npmjs.com/package/chai)                          | javascript testing framework.                                         |
| [react-toastify](https://www.npmjs.com/package/react-toastify)      | For Notification.                                                     |   
| [hardhat](https://www.npmjs.com/package/hardhat)                    | Ethereum development environment.                                     | 
| [Redux](https://www.npmjs.com/package/hardhat)                      | For managing and centralizing application state.                      |   


----------------

### How to run :runner: :

- Run hardhat node
    ```
    npx hardhat node
    ```
- Run test cases
    ```
    npx hardhat test
    ```
- Connect HardHat Account to Metamask

https://github.com/Thiru-Malai/Crowdfunding-DAPP/assets/73980589/f694a9ef-a035-4f2a-9763-98c90839e2b9

- Deploy contract in local hardhat node
    ```
    npx hardhat run scripts/deploy.js --network localhost
    ```
- Run Next.js frontend
    ```
    cd client
    npm run dev
    ```
- Connect account to  website


### Web3.js 
------------
- [Load web3](https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#web3-eth)
- [Connect with contract](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#web3-eth-contract)
    ```
    new web3.eth.Contract(jsonInterface[, address][, options])
    ```
- [Callback promises events](https://web3js.readthedocs.io/en/v1.2.11/callbacks-promises-events.html#callbacks-promises-events)
    ```
    .on('transactionHash', function(hash){ ... })
    .on('error', function(error){ ... })
    ```
- [Subscribe to event](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#contract-events)
    ```
    contractName.events.EventName([options][, callback])
    ```
- [Fetch all data from contract event](https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#getpastevents)
    - <small> An array with the past event Objects, matching the given event name and filter.</small>

    ```
    contractName.getPastEvents(EventName[, options][, callback])
    ```

### Hardhat commands
```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/deploy.js
npx hardhat help
npx hardhat run scripts/deploy.js --network <network name>
```
