const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Counter", function () {

  async function deployOneYearLockFixture() {
    
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    return { counter,  owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should call count correct by the owner", async function () {
      const { counter,  owner, otherAccount} = await loadFixture(deployOneYearLockFixture);
      expect(await counter.count()).to.be.ok;
    });

    it("Should fail, when called not by the owner", async function () {
      const { counter,  owner, otherAccount} = await loadFixture(deployOneYearLockFixture);
      await expect(counter.connect(otherAccount).count()).to.be.revertedWith("not owner")
    });
 
  });

  
});
