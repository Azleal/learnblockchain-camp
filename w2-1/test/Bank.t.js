const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Bank", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBankFixture() {
    // Contracts are deployed using the first signer/account by default
    const [deployer, otherAccount] = await ethers.getSigners();

    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();
    // console.log("deployer:", deployer, ",other:", otherAccount, ",bank:", bank.address)
    return { bank, deployer, otherAccount };
  }

  async function deployBankWithDepositFixture() {
    const { bank,deployer,  otherAccount} = await loadFixture(deployBankFixture);
    const amount = 10000
    await bank.deposit({value: amount})
    await bank.connect(otherAccount).deposit({value: amount})
    return { bank, deployer, otherAccount, amount };
  }

  describe("Deployment", function () {
    it("should deployed", async function(){
      const { bank } = await loadFixture(deployBankFixture);
      expect(bank.address).not.to.be.empty;
    })
  });

  describe("Deposit", function () {
    it("should deposit successfully by deployer", async function(){
      const { bank, deployer } = await loadFixture(deployBankFixture);
      // console.log("bank:", bank, ",deployer:", deployer)
      const amount = 10000
      await bank.deposit({value: amount})
      expect(await bank.balances(deployer.address)).to.be.equal(amount);
    });
    it("should deposit successfully by other account", async function(){
      const { bank, deployer, otherAccount } = await loadFixture(deployBankFixture);
      const amount = 10000
      await bank.connect(otherAccount).deposit({value: amount})
      expect(await bank.balances(otherAccount.address)).to.be.equal(amount);
    })
    it("should deposit fail when use receive function", async function(){
      const { bank,deployer } = await loadFixture(deployBankFixture);
      const amount = 10000
      let tx ={
        to: bank.address,
        value: amount
      }
      await expect(deployer.sendTransaction(tx)).to.be.revertedWith("only use deposit function to deposit");
    })

    it("should deposit fail when use fallback function", async function(){
      const { bank ,deployer} = await loadFixture(deployBankFixture);
      const amount = 10000
      let tx ={
        to: bank.address,
        value: amount,
        data: "0x12345678"
      }
      await expect(deployer.sendTransaction(tx)).to.be.revertedWith("only use deposit function to deposit");
    })
  });

  describe("Withdrawals", function () {

    it("should withdraw successfully", async function(){
      const { bank, deployer, otherAccount, amount} = await loadFixture(deployBankWithDepositFixture);
      const initalBalance = amount
      const randomAmoutToWithdraw = parseInt(Math.random() * amount)
      await bank.withdraw(randomAmoutToWithdraw)
      expect(await bank.balances(deployer.address)).to.be.equal(initalBalance - randomAmoutToWithdraw);
      await bank.withdrawAll()
      expect(await bank.balances(deployer.address)).to.be.equal(0);
    })

    it("should withdrawAll successfully", async function(){
      const { bank, deployer, otherAccount, amount} = await loadFixture(deployBankWithDepositFixture);
      await bank.withdrawAll()
      expect(await bank.balances(deployer.address)).to.be.equal(0);
    })
  })
});
