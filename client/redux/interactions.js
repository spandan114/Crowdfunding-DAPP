import Web3 from "web3";
import * as actions from "./actions";
import CrowdFunding from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json'
import Project from '../artifacts/contracts/Project.sol/Project.json'
import { groupContributionByProject, groupContributors, projectDataFormatter, withdrawRequestDataFormatter} from "../helper/helper";

const crowdFundingContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//Load web3 
export const loadWeb3 = async (dispatch) => {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  dispatch(actions.web3Loaded(web3));
  return web3;
};

// Load connected wallet
export const loadAccount = async (web3, dispatch) => {
  const account = await web3.eth.getAccounts();
  const network = await web3.eth.net.getId();

//   if (network !== Number(process.env.REACT_APP_NETWORK_ID)) {
//     alert("Contract not deployed in this network !");
//   }
  dispatch(actions.walletAddressLoaded(account[0]));
  localStorage.setItem("ADDRESS",account[0])
  return account;
};

//Connect with crowd funding contract
export const loadCrowdFundingContract = async(web3,dispatch) =>{
  const crowdFunding = new web3.eth.Contract(CrowdFunding.abi,crowdFundingContractAddress);
  dispatch(actions.crowdFundingContractLoaded(crowdFunding));
  return crowdFunding;
}

// Start fund raising project
export const startFundRaising = async(web3,CrowdFundingContract,data,onSuccess,onError,dispatch) =>{
  const {minimumContribution,deadline,targetContribution,projectTitle,projectDesc,account} = data;

  await CrowdFundingContract.methods.createProject(minimumContribution,deadline,targetContribution,projectTitle,projectDesc).send({from:account})
  .on('receipt', function(receipt){ 

    const projectsReceipt = receipt.events.ProjectStarted.returnValues;
    const contractAddress = projectsReceipt.projectContractAddress;

    const formattedProjectData = projectDataFormatter(projectsReceipt,contractAddress)
    var projectConnector = new web3.eth.Contract(Project.abi,contractAddress);

    dispatch(actions.newProjectContractsLoaded(projectConnector));
    dispatch(actions.newProjectsLoaded(formattedProjectData));

    onSuccess()
  })
  .on('error', function(error){ 
    onError(error.message)
  })
}

// 1 - Get all funding project address
// 2 - Connect with funding project contract
// 3 - Get project details 
export const getAllFunding = async(CrowdFundingContract,web3,dispatch) =>{
   
  const fundingProjectList = await CrowdFundingContract.methods.returnAllProjects().call()
  
   const projectContracts = [];
   const projects = [];

   await Promise.all(fundingProjectList.map(async (data)=>{
    var projectConnector = new web3.eth.Contract(Project.abi,data);
    const details = await projectConnector.methods.getProjectDetails().call()
    projectContracts.push(projectConnector);
    const formattedProjectData = projectDataFormatter(details,data)
    projects.push(formattedProjectData)
   }))

   dispatch(actions.projectContractsLoaded(projectContracts));
   dispatch(actions.projectsLoaded(projects));

}

// Contribute in fund raising project
export const contribute = async(crowdFundingContract,data,dispatch,onSuccess,onError) =>{
  const {contractAddress,amount,account} = data;
  await crowdFundingContract.methods.contribute(contractAddress).send({from:account,value:amount})
  .on('receipt', function(receipt){
    dispatch(actions.amountContributor({projectId:contractAddress,amount:amount}))
    onSuccess()
  })
  .on('error', function(error){ 
    onError(error.message)
  })
}

// Get all contributors by contract address
export const getContributors = async (web3,contractAddress,onSuccess,onError) =>{
  try {
    var projectConnector = new web3.eth.Contract(Project.abi,contractAddress);
    const getContributions = await projectConnector.getPastEvents("FundingReceived",{
      fromBlock: 0,
      toBlock: 'latest'
    })
    onSuccess(groupContributors(getContributions))
  } catch (error) {
    onError(error)
  }
}

// Request for withdraw amount
export const createWithdrawRequest = async (web3,contractAddress,data,onSuccess,onError) =>{
  const {description,amount,recipient,account} = data;
    var projectConnector = new web3.eth.Contract(Project.abi,contractAddress);
    await projectConnector.methods.createWithdrawRequest(description,amount,recipient).send({from:account})
    .on('receipt', function(receipt){
      const withdrawReqReceipt = receipt.events.WithdrawRequestCreated.returnValues;
      const formattedReqData = withdrawRequestDataFormatter(withdrawReqReceipt,withdrawReqReceipt.requestId)
      onSuccess(formattedReqData)
    })
    .on('error', function(error){ 
      onError(error.message)
    })
}

// Get all withdraw request
export const getAllWithdrawRequest = async (web3,contractAddress,onLoadRequest) =>{
  var projectConnector = new web3.eth.Contract(Project.abi,contractAddress);
  var withdrawRequestCount = await projectConnector.methods.numOfWithdrawRequests().call();
  var withdrawRequests = [];

  if(withdrawRequestCount <= 0){
    onLoadRequest(withdrawRequests)
    return
  }

  for(var i=1;i<=withdrawRequestCount;i++){
    const req = await projectConnector.methods.withdrawRequests(i-1).call();
    withdrawRequests.push(withdrawRequestDataFormatter({...req,requestId:i-1}));
  }
  onLoadRequest(withdrawRequests)
}

// Vote for withdraw request
export const voteWithdrawRequest = async (web3,data,onSuccess,onError) =>{
  const {contractAddress,reqId,account} = data;
  var projectConnector = new web3.eth.Contract(Project.abi,contractAddress);
  await projectConnector.methods.voteWithdrawRequest(reqId).send({from:account})
  .on('receipt', function(receipt){
    console.log(receipt)
    onSuccess()
  })
  .on('error', function(error){ 
    onError(error.message)
  })

}

// Withdraw requested amount 
export const withdrawAmount = async (web3,dispatch,data,onSuccess,onError) =>{
  const {contractAddress,reqId,account,amount} = data;
  var projectConnector = new web3.eth.Contract(Project.abi,contractAddress);
  await projectConnector.methods.withdrawRequestedAmount(reqId).send({from:account})
  .on('receipt', function(receipt){
    console.log(receipt)
    dispatch(actions.withdrawContractBalance({
      contractAddress:contractAddress,
      withdrawAmount:amount
    }))
    onSuccess()
  })
  .on('error', function(error){ 
    onError(error.message)
  })
}

//Get my contributions
export const getMyContributionList = async(crowdFundingContract,account) =>{
  const getContributions = await crowdFundingContract.getPastEvents("ContributionReceived",{
    filter: { contributor: account },
    fromBlock: 0,
    toBlock: 'latest'
  })
  return groupContributionByProject(getContributions);
}
