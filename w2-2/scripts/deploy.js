// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [signer] = await hre.ethers.getSigners()
  console.log("signer:", signer.address)

  const Score = await hre.ethers.getContractFactory("Score");
  const Teacher = await hre.ethers.getContractFactory("Teacher");
  const score = await Score.deploy();
  await score.deployed();
  console.log(`Score deployed, address ${score.address}`)
  const teacher = await Teacher.deploy(score.address)
  await teacher.deployed()
  console.log(`Teacher deployed, address ${teacher.address}`)
  await score.setTeacher(teacher.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
