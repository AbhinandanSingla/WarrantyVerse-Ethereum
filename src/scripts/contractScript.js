import {ethers} from "ethers";

const {ethereum} = window;
const {API_URL, PUBLIC_KEY} = require("../config");
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
const contract = require("../artifacts/contracts/contracts.sol/Seller.json");
export const contractAddress = "0x2fFf1bcc811d2EcFa2A16a6F5DacB0Ecb5545374";
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner()
export const contracts = new ethers.Contract(contractAddress, contract.abi, signer);
export const web3 = createAlchemyWeb3(API_URL);
