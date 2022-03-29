//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import './Project.sol';

contract Crowdfunding{

// [X] Anyone can start a funding project .
// [X] Get All project list
// [] Filter projects

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

 Project[] private projects;

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

function returnAllProjects() external view returns(Project[] memory){
   return projects;
}

}

