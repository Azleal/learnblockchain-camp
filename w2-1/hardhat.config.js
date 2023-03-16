require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    goerli : {
      url: process.env.GOERLI_RPC_URL,
      accounts:{
        mnemonic: process.env.TEST_MNEMONIC
      }
    }
  },
  etherscan:{
    apiKey: process.env.ETHERSCAN_API_KEY
  },
};
