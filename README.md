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

## AutoBurn Warranty Setup

* Replace contract Address in AutoburnWarranty/index.js with your contract address
* `node index.js` to start server

### Web Preview

> Connecting Page

#### For connecting metamask wallet

# ![connecting Page](https://raw.githubusercontent.com/AbhinandanSingla/warranty-verse/master/blob/images/connectingPage.png)

#### For adding seller so that he can mint Warranty

> Owner Page

# ![addSeller Page](https://raw.githubusercontent.com/AbhinandanSingla/warranty-verse/master/blob/images/addSeller.png)

#### After getting authorized now seller can mint warranty by filling following details

> Seller page

# ![mint warranty](https://raw.githubusercontent.com/AbhinandanSingla/warranty-verse/master/blob/images/mintWarranty.png)

> Validate Warranty

##### (Only seller can Validate the warranty)

# ![Validate](https://raw.githubusercontent.com/AbhinandanSingla/warranty-verse/master/blob/images/validate.png)

# ![validated](https://raw.githubusercontent.com/AbhinandanSingla/warranty-verse/master/blob/images/validatProduct.png)

> ### User pages

# ![user](https://raw.githubusercontent.com/AbhinandanSingla/warranty-verse/master/blob/images/user.png)

All Minted Warranty can viewed by user

# ![Dashboard](https://raw.githubusercontent.com/AbhinandanSingla/warranty-verse/master/blob/images/dashboard.png)
