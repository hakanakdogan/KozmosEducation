require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  
  solidity: "0.8.17",
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      chainId: 31337
    }
  },
};