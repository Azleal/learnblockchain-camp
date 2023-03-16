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
    },
    mumbai : {
      url: process.env.MUMBAI_RPC_URL,
      accounts:{
        mnemonic: process.env.TEST_MNEMONIC
      }
    },
    // localhost : {
    //   url: "http://localhost:8545",
    //   chainId: 1337
    // },
  },
  etherscan:{
    // apiKey: process.env.ETHERSCAN_API_KEY,
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
};
