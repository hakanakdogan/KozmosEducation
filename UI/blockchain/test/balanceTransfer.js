const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BalanceTransfer", function () {
  let balanceTransfer;

  beforeEach(async function () {
    const BalanceTransfer = await ethers.getContractFactory("BalanceTransfer");
    balanceTransfer = await BalanceTransfer.deploy();
    await balanceTransfer.deployed();
  });

  it("should add balance correctly", async function () {
    const initialBalance = await balanceTransfer.getBalance(await ethers.provider.getSigner(0).getAddress());
    const amount = ethers.utils.parseEther("1");
    await balanceTransfer.addBalance(await ethers.provider.getSigner(0).getAddress(), { value: amount });
    const finalBalance = await balanceTransfer.getBalance(await ethers.provider.getSigner(0).getAddress());
    expect(finalBalance).to.equal(initialBalance.add(amount));
  });

  it("should withdraw balance correctly", async function () {
    const amount = ethers.utils.parseEther("1");

    const initialBalance = await ethers.provider.getBalance(await ethers.provider.getSigner(0).getAddress());
    console.log("INITIAL BALANCE: ", initialBalance);

    await balanceTransfer.addBalance(await ethers.provider.getSigner(0).getAddress(), { value: amount });

    const lockedBalance = await balanceTransfer.getBalance(await ethers.provider.getSigner(0).getAddress());
    expect(lockedBalance).to.equal(amount);
    console.log("LOCKED BALANCE: ",lockedBalance);

    const currentUserBalance = await ethers.provider.getBalance(await ethers.provider.getSigner(0).getAddress());
    console.log("CURRENT BALANCE: ",currentUserBalance);

    await balanceTransfer.withdrawBalance();

    const finalBalance = await ethers.provider.getBalance(await ethers.provider.getSigner(0).getAddress());
    console.log("FINAL BALANCE: ", finalBalance);

    expect(await balanceTransfer.getBalance(await ethers.provider.getSigner(0).getAddress())).to.equal(0);
  });
});
