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
            const project = await projectContract.contribute(address1.address,{value:etherToWei('4')});
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
            await expect(projectContract.connect(address1).contribute(address1.address,{value:etherToWei('0.5')})).to.be.revertedWith('Contribution amount is too low !');
        })

        it("State should change to Successful if targeted amount hit ", async () => {
            await projectContract.contribute(address1.address,{value:etherToWei('12')});
            expect(Number(await projectContract.completeAt())).to.greaterThan(0);
            expect(await projectContract.state()).to.equal(+2);
        })

    })

    describe("Create withdraw request", async function () {
      it("Should fail if someone else try to request (Only owner can make request) ", async () => {
        await expect(projectContract.connect(address2).createWithdrawRequest("Testing description",etherToWei('2'),address2.address)).to.be.revertedWith('You dont have access to perform this operation !');
      })

      it("Withdraw request Should fail if status not equal to Successful ", async () => {
        await expect(projectContract.connect(address1).createWithdrawRequest("Testing description",etherToWei('2'),address1.address)).to.be.revertedWith('Invalid state');
      })

      it("Request for withdraw", async () => {
        await projectContract.contribute(address1.address,{value:etherToWei('12')});
        const withdrawRequest = await projectContract.connect(address1).createWithdrawRequest("Testing description",etherToWei('2'),address1.address)
        const event = await withdrawRequest.wait();

        // Test Event
        expect(event.events.length).to.equal(1);
        expect(event.events[0].event).to.equal("WithdrawRequestCreated");
        expect(event.events[0].args.description).to.equal("Testing description");
        expect(event.events[0].args.amount).to.equal(etherToWei('2'));
        expect(event.events[0].args.noOfVotes).to.equal(0);
        expect(event.events[0].args.isCompleted).to.equal(false);
        expect(event.events[0].args.reciptent).to.equal(address1.address);

      })
    })

    describe("Vote for withdraw request", async function () {

      it("Only contributor can vote ", async () => {
        await projectContract.contribute(address1.address,{value:etherToWei('12')});
        await projectContract.connect(address1).createWithdrawRequest("Testing description",etherToWei('2'),address1.address)
        await expect(projectContract.connect(address2).voteWithdrawRequest(0)).to.be.revertedWith('Only contributor can vote !');
      })

      it("Vote withdraw request", async () => {
        await projectContract.contribute(address1.address,{value:etherToWei('6')});
        await projectContract.contribute(address2.address,{value:etherToWei('7')});

        await projectContract.connect(address1).createWithdrawRequest("Testing description",etherToWei('2'),address1.address)
        const voteForWithdraw = await projectContract.connect(address2).voteWithdrawRequest(0)
        const event = await voteForWithdraw.wait();

        // Test Event
        expect(event.events.length).to.equal(1);
        expect(event.events[0].event).to.equal("WithdrawVote");
        expect(event.events[0].args.voter).to.equal(address2.address);
        expect(Number(event.events[0].args.totalVote)).to.equal(1);

      })

      it("Should fail if request already vote", async () => {
        await projectContract.contribute(address1.address,{value:etherToWei('6')});
        await projectContract.contribute(address2.address,{value:etherToWei('7')});

        await projectContract.connect(address1).createWithdrawRequest("Testing description",etherToWei('2'),address1.address)
        await projectContract.connect(address2).voteWithdrawRequest(0)
        
        await expect(projectContract.connect(address2).voteWithdrawRequest(0)).to.be.revertedWith('You already voted !');
      })

    })

    describe("Withdraw balance", async function () {
      it("Should fail if 50% contributor need to voted", async () => {
        await projectContract.contribute(address1.address,{value:etherToWei('6')});
        await projectContract.contribute(address2.address,{value:etherToWei('7')});

        await projectContract.connect(address1).createWithdrawRequest("Testing description",etherToWei('2'),address1.address)

        await expect(projectContract.connect(address1).withdrawRequestedAmount(0)).to.be.revertedWith('At least 50% contributor need to vote for this request');
      })

      it("Withdraw requested balance", async () => {
        await projectContract.contribute(address1.address,{value:etherToWei('6')});
        await projectContract.contribute(address2.address,{value:etherToWei('7')});

        await projectContract.connect(address1).createWithdrawRequest("Testing description",etherToWei('2'),address1.address)
        await projectContract.connect(address1).voteWithdrawRequest(0)
        await projectContract.connect(address2).voteWithdrawRequest(0)

        const withdrawAmount = await projectContract.connect(address1).withdrawRequestedAmount(0);
        const event = await withdrawAmount.wait();

        // Test Event
        expect(event.events.length).to.equal(1);
        expect(event.events[0].event).to.equal("AmountWithdrawSuccessful");
        expect(event.events[0].args.amount).to.equal(etherToWei('2'));
        expect(event.events[0].args.noOfVotes).to.equal(2);
        expect(event.events[0].args.isCompleted).to.equal(true);
        expect(event.events[0].args.reciptent).to.equal(address1.address);
      })

      it("Should fail if request already completed", async () => {
        await projectContract.contribute(address1.address,{value:etherToWei('6')});
        await projectContract.contribute(address2.address,{value:etherToWei('7')});

        await projectContract.connect(address1).createWithdrawRequest("Testing description",etherToWei('2'),address1.address)
        await projectContract.connect(address1).voteWithdrawRequest(0)
        await projectContract.connect(address2).voteWithdrawRequest(0)
        await projectContract.connect(address1).withdrawRequestedAmount(0);

        await expect(projectContract.connect(address1).withdrawRequestedAmount(0)).to.be.revertedWith('Request already completed');
      })

    })

})