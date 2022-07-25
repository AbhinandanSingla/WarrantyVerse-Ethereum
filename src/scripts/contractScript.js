import {ethers} from "ethers";

const {ethereum} = window;
const {API_URL, PUBLIC_KEY} = require("../config");
const {createAlchemyWeb3} = require("@alch/alchemy-web3");
const contract = require("../artifacts/contracts/contracts.sol/Seller.json");
export const contractAddress = "0xb99F6E7A67E1C52B89207146D9Dc524A7f387133";
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner()
export const contracts = new ethers.Contract(contractAddress, contract.abi, signer);
export const web3 = createAlchemyWeb3(API_URL);
