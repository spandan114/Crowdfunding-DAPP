const { expect } = require("chai");
const { ethers } = require("hardhat");
var fs =require("fs");

const etherToWei = (n) =>{
  return ethers.utils.parseUnits(n,'ether')
}

const dateToUNIX = (date) => {
  return Math.round(new Date(date).getTime() / 1000).toString()
}

describe("Crowdfunding", async () => {

  var address1; 
  var address2; 
  var crowdfundingContract;
  var projectContract;

  beforeEach(async function () {
    [address1, address2,  ...address] = await ethers.getSigners();

    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    crowdfundingContract = await Crowdfunding.deploy();

    // const Project = await ethers.getContractFactory("Project");
    // projectContract = await Project.deploy();

  })

  describe("Request for funding", async function () {
    it("Start a project", async function () {

      const minimumContribution=etherToWei('1');
      const deadline=dateToUNIX('2022-04-15');
      const targetContribution=etherToWei('100');
      const projectTitle='Testing title';
      const projectDesc='Testing description';

      const project = await crowdfundingContract.connect(address1).createProject(minimumContribution,deadline,targetContribution,projectTitle,projectDesc)
      const event = await project.wait();

      const projectList = await crowdfundingContract.returnAllProjects();

      // Test Event
      expect(event.events.length).to.equal(1);
      expect(event.events[0].event).to.equal("projectStarted");
      expect(event.events[0].args.projectContractAddress).to.equal(projectList[0]);
      expect(event.events[0].args.creator).to.equal(address1.address);
      expect(event.events[0].args.minimumContribution).to.equal(minimumContribution);
      expect(Number(event.events[0].args.deadline)).to.greaterThan(0);
      expect(event.events[0].args.targetContribution).to.equal(targetContribution);
      expect(event.events[0].args.raisedAmount).to.equal(0);
      expect(event.events[0].args.noOfContributors).to.equal(0);
      expect(event.events[0].args.projectTitle).to.equal(projectTitle);
      expect(event.events[0].args.projectDesc).to.equal(projectDesc);

    });

  })

});
