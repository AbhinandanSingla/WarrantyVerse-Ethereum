# WarrantVerse

> Deploying WarrantyContract

* create .env file in root folder with following values
* `API_URL=<Alchemy api>`
* `PRIVATE_KEY= <private key of Account>`
* `PUBLIC_KEY= <public key of your Account>`

##### Alchemy api [Alchemy](https://www.alchemy.com/)

```shell
npx hardhat run src/scripts/deploy.js --network goerli
```

* Copy the address and replace it with contractAddress in contractScripts.js
```
export const contractAddress = <Contract Address>;
```
* Now run command ```npm install``` to install all dependencies
* Start dapp with ``npm start``


>[ConnectingPage](https://localhost:3000)
![alt text](https://github.com/[abhinandan]/[warranty-verse]/blob/[branch]/image.jpg?raw=true)
