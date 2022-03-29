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

    // Variables
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

    // Modifiers
    modifier isCreator(){
        require(msg.sender == creator,'You dont have access to perform this operation !');
        _;
    }

    modifier validateExpiry(State _state){
        require(state == _state,'Invalid state');
        require(block.timestamp < deadline,'Deadline has passed !');
        _;
    }


   constructor(
       address _creator,
       uint256 _minimumContribution,
       uint256 _deadline,
       uint256 _targetContribution,
       string memory _projectTitle,
       string memory _projectDes
   ) {
       creator = payable(_creator);
       minimumContribution = _minimumContribution;
       deadline = _deadline;
       targetContribution = _targetContribution;
       projectTitle = _projectTitle;
       projectDes = _projectDes;
       raisedAmount = 0;
   }


 function contribute() public validateExpiry(State.Fundraising) payable {
     require(msg.value >= minimumContribution,'Contribution amount is too low !');

     if(contributiors[msg.sender] == 0){
         
     }
 }

}