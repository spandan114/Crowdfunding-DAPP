//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// [] Anyone can contribute
// [] End project if targeted contribution amount reached
// [] Expire project if raised amount not fullfill between deadline
//    & return donated amount to all contributor .
// [] Owner can request contributer before withdraw amount
// [] Withdraw amount if 50% contributor agree

contract Project{

   // Project state
    enum State {
        Fundraising,
        Expired,
        Successful
    }

    address payable public creator;
    uint256 minimumContribution;
    uint256 deadline;
    uint256 targetContribution; // required to reach at least this much amount
    uint public completeAt;
    uint256 raisedAmount; // Total raised amount till now
    string projectTitle;
    string projectDes;
    State public state = State.Fundraising; 

    mapping (address => uint) public contributiors;



}