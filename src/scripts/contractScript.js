import {ethers} from "ethers";
const {ethereum} = window;
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
export const API_URL='https://eth-goerli.g.alchemy.com/v2/BSt1drEvhViEB11PoABz805f8Oz6kVSY';
const contract = require("../artifacts/contracts/contracts.sol/Seller.json");
export const contractAddress = "0x2cb53351E9aF2F02899D904788705C83BAEe5001";
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner()
export const contracts = new ethers.Contract(contractAddress, contract.abi, signer);
export const web3 = createAlchemyWeb3(API_URL);
