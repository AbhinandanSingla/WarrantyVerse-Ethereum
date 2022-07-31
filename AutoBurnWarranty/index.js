require("dotenv").config();
const express = require('express')
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
const API_URL = 'https://eth-goerli.g.alchemy.com/v2/BSt1drEvhViEB11PoABz805f8Oz6kVSY'
const web3 = createAlchemyWeb3(API_URL);
const app = express();
const port = 8000;
const contractAddress = "0x7C7Edfc9eFa2223E907FFA7618e9a9437b452554";
const axios = require('axios');
const baseURL = `https://eth-goerli.g.alchemy.com/v2/BSt1drEvhViEB11PoABz805f8Oz6kVSY/getNFTsForCollection`;
const owner = `https://eth-goerli.g.alchemy.com/v2/BSt1drEvhViEB11PoABz805f8Oz6kVSY/getOwnersForToken`;
const withMetadata = "true";
const contract = require("../artifacts/contracts/contracts.sol/Seller.json")
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

var config = {
    method: 'get',
    url: `${baseURL}?contractAddress=${contractAddress}&withMetadata=${withMetadata}`,
    headers: {}
};

async function burnWarranty(user, token) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.burnWarranty(user, token).encodeABI(),
    };
    console.log("nfts need to expire")
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        );
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        );
                    }
                }
            );
        })
        .catch((err) => {
            console.log(" Promise failed:", err);
        });
}

var interval = setInterval(function () {
    console.log("Server is Running Successfully")
    axios(config)
        .then(async response => {
            let data = response.data;
            for (let i in data['nfts']) {
                if (data['nfts'][i]['metadata']['expireDate'] * 1000 < Date.now()) {
                    var config = {
                        method: 'get',
                        url: `${owner}?contractAddress=${contractAddress}&tokenId=${i}`,
                        headers: {}
                    };
                    axios(config)
                        .then(response => {
                            let d = response.data;
                            console.log(d['owners']['0'])
                            burnWarranty(d['owners']['0'], i).then(r => console.log("done"))

                        })
                        .catch(error => console.log(error));
                }
            }
        })
        .catch(error => console.log(error));

}, 1000);
app.listen(port, () => {
    console.log('LISTENING TO SERVER' + port);
});
