const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crowdfunding", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    const crowdfunding = await Crowdfunding.deploy("Hello, world!");
    await crowdfunding.deployed();

  });
});