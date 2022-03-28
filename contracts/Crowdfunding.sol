//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import './Project.sol';

contract Crowdfunding{

// [] Anyone can start a funding project .

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

 function createProject() public {

 }

}

