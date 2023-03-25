const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("MyERC20", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMyERC20Fixture() {
    
    const [owner, otherAccount] = await ethers.getSigners();
    const [tokenName, tokenSymbol] = ["Azleal", "AZLEAL"]

    const MyERC20 = await ethers.getContractFactory("MyERC20");
    const myERC20 = await MyERC20.deploy(tokenName, tokenSymbol);

    const Vault = await ethers.getContractFactory("Vault");
    const vault = await Vault.deploy(myERC20.address);
    console.log("owner:", owner.address, "otherAccount:", otherAccount.address, "myERC20:", myERC20.address, "vault:", vault.address)
    return {owner, otherAccount, myERC20, vault}
  }


  async function buyToken(account, value, tokenContract){
    await tokenContract.connect(account).buy({value: value})
  }

  describe("MyERC20", function () {
    it("should deployed successful", async function () {
      const {owner, otherAccount, myERC20, vault} = await loadFixture(deployMyERC20Fixture);
      
      expect(await myERC20.address).to.be.ok;
      expect(await vault.address).to.be.ok;
      expect(await myERC20.address).to.be.equal(await vault._token());
    });

    it("should buy token successfully", async function () {
      const {owner, otherAccount, myERC20, vault} = await loadFixture(deployMyERC20Fixture);

      const value = 100;
      await buyToken(otherAccount, value,myERC20)
      const balance = await myERC20.balanceOf(otherAccount.address)
      const ratio = await myERC20.ETH_BUY_IN_RATIO()
      expect(value * ratio).to.be.equal(balance)
    })
    
    it("transfer fail", async function () {
      const {owner, otherAccount, myERC20, vault} = await loadFixture(deployMyERC20Fixture);
      const amount = 100;
      await expect(myERC20.connect(otherAccount).transfer(owner.address, amount)).to.be.revertedWithCustomError(myERC20, "InsufficientBalance");
    })

    it("transfer success", async function () {
      const {owner, otherAccount, myERC20, vault} = await loadFixture(deployMyERC20Fixture);
      const value = 100;
      await buyToken(otherAccount, value, myERC20)
      const amount = 100 * 2
       expect(await myERC20.connect(otherAccount).transfer(owner.address, amount)).to.be.ok;
    })

    it("transferFrom fail", async function () {
      const {owner, otherAccount, myERC20, vault} = await loadFixture(deployMyERC20Fixture);
      const value = 100;
      await buyToken(otherAccount, value, myERC20)
      const amount = 100;
      await expect(myERC20.transferFrom(otherAccount.address, owner.address, amount)).to.be.revertedWithCustomError(myERC20, "InsufficientAllowanceCredit");

    })

    it("transferFrom success", async function () {
      const {owner, otherAccount, myERC20, vault} = await loadFixture(deployMyERC20Fixture);
      const value = 100;
      await buyToken(otherAccount, value, myERC20)
      const amount = 100 * 2
      await myERC20.connect(otherAccount).approve(owner.address, 10**10)
      expect(await myERC20.transferFrom(otherAccount.address, owner.address, amount)).to.be.ok;
    })

    it("should withdraw all ethers", async function () {
      const {owner, otherAccount, myERC20, vault} = await loadFixture(deployMyERC20Fixture);

      const ownerBalance = parseInt(await ethers.provider.getBalance(owner.address))
      console.log(ownerBalance)
      const value = 4696142414275000;
      await buyToken(otherAccount, value, myERC20)
      await myERC20.withdraw()
      const ownerNewBalance =  parseInt(await ethers.provider.getBalance(owner.address))
      console.log(ownerNewBalance)
    })

  });

  describe("Vault", function () {
    it

  })
});
