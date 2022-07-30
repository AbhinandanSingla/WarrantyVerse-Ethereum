const {ethers} = require("hardhat");

async function main() {
  const contract = await ethers.getContractFactory("Seller");
  // Start deployment, returning a promise that resolves to a contract object
  const newCont = await contract.deploy();
  console.log("Contract deployed to address:", newCont.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
