const { ethers } = require("hardhat");

const main = async () => {
  const polygon = await ethers.getContractFactory("AgeVerification");
  const polygonDeploy = await polygon.deploy();
  await polygonDeploy.deployed();
  console.log("Age verification Address:", polygonDeploy.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
