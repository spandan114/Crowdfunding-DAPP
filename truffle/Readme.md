* Install truffle globaly \
`
npm install -g truffle 
`
* Run Ganache \n
* Run migrate command to generate ABI \
`truffle migrate`

![image](https://user-images.githubusercontent.com/55044734/176733132-353a7758-ec71-466b-b2b3-78fc5658ee8c.png)

Access contract address

```
var data =   {"networks": {
    "5777": {
      "events": {},
      "links": {},
      "address": "0xA1Fef54d0a757931E90e734148B0019733B9BCFf",
      "transactionHash": "0x24388333209b743ab4ade2eb3b7ff1e5306bcb6086dcb3897a50833ba86a00b3"
    }
  }}
  
  console.log(data.networks["5777"].address)```

