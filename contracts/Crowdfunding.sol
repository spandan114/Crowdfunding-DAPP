//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import './Project.sol';

contract Crowdfunding{

// [X] Anyone can start a funding project .
// [X] Get All project list
// [X]  contribute amount

event projectStarted(
    address projectContractAddress ,
    address creator,
    uint256 minimumContribution,
    uint256 deadline,
    uint256 targetContribution,
    uint256 raisedAmount,
    uint256 noOfContributors,
    string projectTitle,
    string projectDesc
);

event ContributionReceived(
   address projectAddress,
   uint256 contributedAmount,
   address contributor
);

 Project[] private projects;

  // @dev Anyone can start a fund rising
 // @return null

 function createProject(
    uint256 minimumContribution,
    uint256 deadline,
    uint256 targetContribution,
    string memory projectTitle,
    string memory projectDesc
 ) public {

   deadline = block.timestamp+deadline;

   Project newProject = new Project(msg.sender,minimumContribution,deadline,targetContribution,projectTitle,projectDesc);
   projects.push(newProject);
 
 emit projectStarted(
    address(newProject) ,
    msg.sender,
    minimumContribution,
    deadline,
    targetContribution,
    0,
    0,
    projectTitle,
    projectDesc
 );

 }

 // @dev Get projects list
// @return array

function returnAllProjects() external view returns(Project[] memory){
   return projects;
}

// @dev User can contribute
// @return null

function contribute(address _projectAddress) public payable{

   uint256 minContributionAmount = Project(_projectAddress).minimumContribution();
   Project.State projectState = Project(_projectAddress).state();
   require(projectState == Project.State.Fundraising,'Invalid state');
   require(msg.value >= minContributionAmount,'Contribution amount is too low !');
   // Call function
   Project(_projectAddress).contribute{value:msg.value}(msg.sender);
   // Trigger event 
   emit ContributionReceived(_projectAddress,msg.value,msg.sender);
}

}

