/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-ethers");
const {API_KEY, PRIVATE_KEY} = process.env;
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
      {
        version: "0.8.0",
      },
      {
        version: "0.7.6",
      },
    ],
  },
  networks:{
    mumbai:{
      url:`https://polygon-mumbai.g.alchemy.com/v2/${API_KEY}`,
      accounts:[`0x${PRIVATE_KEY}`],
    },
  },
};
