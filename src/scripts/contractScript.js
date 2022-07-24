import {ethers} from "ethers";

const {ethereum} = window;
const {API_URL, PUBLIC_KEY} = require("../config");
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/Admin.sol/Admin.json");
const contractAddress = "0xB23242642Db28Ed3A04Fb8427875a71a9d47612b";
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner()
const contracts = new ethers.Contract(contractAddress, contract.abi, signer);

export async function addSeller(address) {
    // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
    try {
        const code = await contracts.addSeller(address);
        console.log(code);
    } catch (err) {
        console.log(Object.keys(err));
        console.log(Object.values(err))
        console.log(err.reason)
    }

    // f3c9069e4e3a13c', type: 2, accessList: null, blockHash: null, blockNumber: null, …}
    // accessList: null
    // blockHash: null
    // blockNumber: null
    // chainId: 0
    // confirmations: 0
    // creates: null
    // data: "0xd93fabfa000000000000000000000000631a024f6d2b213f116770e2afcc21f0119c4019"
    // from: "0x631a024F6D2B213f116770E2afcc21F0119c4019"
    // gasLimit: BigNumber {_hex: '0x010ca0', _isBigNumber: true}
    // gasPrice: BigNumber {_hex: '0x59682f0d', _isBigNumber: true}
    // hash: "0x831667656c7faaee3db16d12a682596a9a5cab648dcce9dc5f3c9069e4e3a13c"
    // maxFeePerGas: BigNumber {_hex: '0x59682f0d', _isBigNumber: true}
    // maxPriorityFeePerGas: BigNumber {_hex: '0x59682f00', _isBigNumber: true}
    // nonce: 15
    // r: "0xc424711b4423aa5db023bb36e3eb1af71b4af2714d56163ff16698508ed7c4ce"
    // s: "0x52f3783b52b2a8f36e6cc7be1ba857df3d32ff48ced824ea3e725ecf26409a60"
    // to: "0x46D74637d93Cd0aaaB03103c26C6994ce308d4bE"
    // transactionIndex: null
    // type: 2
    // v: 0
    // value: BigNumber {_hex: '0x00', _isBigNumber: true}
    // wait: confirmations => {…}
    // [[Prototype]]: Object
}

export async function validateSeller(address, tokenID) {
    // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
    try {
        const code = await contracts.validate(address, tokenID);
        console.log(code);
    } catch (err) {
        console.log(Object.keys(err));
        console.log(Object.values(err))
        console.log(err.reason)
    }
}

export async function getAllNfts(address) {
    // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
    try {
        const code = await contracts.getAllUserNfts(address);
        console.log(code);
    } catch (err) {
        console.log(Object.keys(err));
        console.log(Object.values(err))
        console.log(err.reason)
    }
}

export async function mintWarranty(address, tokenURI, expireDate) {
    // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
    try {
        const code = await contracts.mintWarrantyNFT(address, tokenURI, expireDate);
        console.log(code);
    } catch (err) {
        console.log(Object.keys(err));
        console.log(Object.values(err))
        console.log(err.reason)
    }
}

export async function transferFrom(address, to, tokenID) {
    // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
    try {
        const code = await contracts.transferFrom(address, to, tokenID);
        console.log(code);
    } catch (err) {
        console.log(Object.keys(err));
        console.log(Object.values(err))
        console.log(err.reason)
    }
}
