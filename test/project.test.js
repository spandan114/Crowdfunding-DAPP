const { expect } = require("chai");
const { ethers } = require("hardhat");

const etherToWei = (n) =>{
  return ethers.utils.parseUnits(n,'ether')
}

const dateToUNIX = (date) => {
  return Math.round(new Date(date).getTime() / 1000).toString()
}

describe("Project", () => {

    var address1; 
    var address2; 
    var projectContract;
  
    beforeEach(async function () {
      [address1, address2,  ...address] = await ethers.getSigners();

      const creator = address1.address;
      const minimumContribution = etherToWei("1");
      const deadline = dateToUNIX('2022-05-22');
      const targetContribution = etherToWei("10");
      const projectTitle = "Testing project";
      const projectDes = "Testing project description"
  
      const Project = await ethers.getContractFactory("Project");
      projectContract = await Project.deploy(creator,minimumContribution,deadline,targetContribution,projectTitle,projectDes);

    })

    describe("Check project variables & Contribute", async function () {
        it("Validate variables", async function () {
           expect(await projectContract.creator()).to.equal(address1.address);
           expect(await projectContract.minimumContribution()).to.equal(etherToWei("1"));
           expect(Number(await projectContract.deadline())).to.greaterThan(0);
           expect(await projectContract.targetContribution()).to.equal(etherToWei("10"));
           expect(await projectContract.projectTitle()).to.equal("Testing project");
           expect(await projectContract.projectDes()).to.equal("Testing project description");
           expect(await projectContract.state()).to.equal(+0);
           expect(await projectContract.noOfContributers()).to.equal(0);

        })

        it("Contribute", async function () {
            const project = await projectContract.connect(address1).contribute({value:etherToWei('4')});
            const event = await project.wait();

            // Test Event
            expect(event.events.length).to.equal(1);
            expect(event.events[0].event).to.equal("FundingReceived");
            expect(event.events[0].args.contributor).to.equal(address1.address);
            expect(event.events[0].args.amount).to.equal(etherToWei('4'));
            expect(event.events[0].args.currentTotal).to.equal(etherToWei('4'));

            expect(await projectContract.noOfContributers()).to.equal(1);
            expect(await projectContract.getContractBalance()).to.equal(etherToWei('4'));            
            
        })

        it("Should fail if amount is less than minimum contribution amount", async () => {
            await expect(projectContract.connect(address1).contribute({value:etherToWei('0.5')})).to.be.revertedWith('Contribution amount is too low !');
        })

        it("State should change to Successful if targeted amount hit ", async () => {
            await projectContract.connect(address1).contribute({value:etherToWei('12')});
            expect(Number(await projectContract.completeAt())).to.greaterThan(0);
            expect(await projectContract.state()).to.equal(+2);
        })

    })

    describe("Withdraw request", async function () {

    })

    describe("Vote for withdraw request", async function () {

    })

    describe("Withdraw balance", async function () {

    })

})