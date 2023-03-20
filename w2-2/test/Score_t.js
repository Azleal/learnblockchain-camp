const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("ScoreAndTeacher", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Score = await hre.ethers.getContractFactory("Score");
    const Teacher = await hre.ethers.getContractFactory("Teacher");
    const score = await Score.deploy();
    await score.deployed();
    console.log(`Score deployed, address ${score.address}`)
    const teacher = await Teacher.deploy(score.address)
    await teacher.deployed()
    console.log(`Teacher deployed, address ${teacher.address}`)
    await score.setTeacher(teacher.address)

    return { score, teacher, owner, otherAccount };
  }

  describe("Deployment Success", function () {
    it("Should deployed success", async function () {
      const { score, teacher } = await loadFixture(deployFixture);
      expect(await score.address).to.be.exist;
      expect(await teacher.address).to.be.exist;
    });
  });





});
