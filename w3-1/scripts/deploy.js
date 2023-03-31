// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {
  getDomainSeperator,
  getPermitTypedDataFunction,
} = require('./MyERC20-permit')

async function main() {
    const network = await hre.ethers.provider.getNetwork()
    console.log("network:", network)
    const [owner, otherAccount] = await hre.ethers.getSigners();
    const [tokenName, tokenSymbol, version] = ["Azleal", "AZLEAL", "1"]

    const MyERC20 = await hre.ethers.getContractFactory("MyERC20");
    const myERC20 = await MyERC20.deploy(tokenName, tokenSymbol, version);
    
    await myERC20.deployed()
    const domain = getDomainSeperator(tokenName, version, network.chainId, myERC20.address);
    console.log("domain:", domain)
    const permitFunction = getPermitTypedDataFunction(domain)


    const Vault = await hre.ethers.getContractFactory("Vault");
    const vault = await Vault.deploy(myERC20.address);
    console.log("owner:", owner.address, "otherAccount:", otherAccount.address, "myERC20:", myERC20.address, "vault:", vault.address)
    await vault.deployed()

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
