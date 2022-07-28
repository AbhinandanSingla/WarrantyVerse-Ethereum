import {ethers} from "ethers";

const {ethereum} = window;
const {API_URL, PUBLIC_KEY} = require("../config");
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
const contract = require("../artifacts/contracts/contracts.sol/Seller.json");
export const contractAddress = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner()
export const contracts = new ethers.Contract(contractAddress, contract.abi, signer);
export const web3 = createAlchemyWeb3(API_URL);
