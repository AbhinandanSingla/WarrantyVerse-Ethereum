import {ethers} from "ethers";

const {ethereum} = window;
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
export const API_URL = 'https://eth-goerli.g.alchemy.com/v2/BSt1drEvhViEB11PoABz805f8Oz6kVSY';
const contract = require("../artifacts/contracts/contracts.sol/Seller.json");
export const contractAddress = "0x7C7Edfc9eFa2223E907FFA7618e9a9437b452554";
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner()
export const contracts = new ethers.Contract(contractAddress, contract.abi, signer);
export const web3 = createAlchemyWeb3(API_URL);
