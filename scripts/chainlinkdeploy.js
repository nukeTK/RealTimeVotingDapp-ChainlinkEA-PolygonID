const { ethers } = require("hardhat");

const LINK_TOKEN = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

const main = async () => {
  const owner = await ethers.getSigner();
  const operatorContract = await ethers.getContractFactory("Operator");
  const operatorDeploy = await operatorContract.deploy(
    LINK_TOKEN,
    owner.address
  );
  await operatorDeploy.deployed();
  console.log("Address of operator:", operatorDeploy.address);
  const consumerContract = await ethers.getContractFactory("Consumer");
  const consumerDeploy = await consumerContract.deploy(
    LINK_TOKEN,
    operatorContract.address
  );
  await consumerDeploy.deployed();
  console.log("Address of ConsumerContract:", consumerDeploy.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
