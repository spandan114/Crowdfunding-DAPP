import Web3 from "web3";
import * as actions from "./actions";
import CrowdFunding from '../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json'
import Project from '../artifacts/contracts/Project.sol/Project.json'
import { projectDataFormatter } from "../helper/helper";

const crowdFundingContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const loadWeb3 = async (dispatch) => {
  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
  dispatch(actions.web3Loaded(web3));
  return web3;
};

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

export const loadCrowdFundingContract = async(web3,dispatch) =>{
  const crowdFunding = new web3.eth.Contract(CrowdFunding.abi,crowdFundingContractAddress);
  dispatch(actions.crowdFundingContractLoaded(crowdFunding));
  return crowdFunding;
}

export const startFundRaising = async(CrowdFundingContract,data,onSuccess,onError) =>{
  const {minimumContribution,deadline,targetContribution,projectTitle,projectDesc,account} = data;

  await CrowdFundingContract.methods.createProject(minimumContribution,deadline,targetContribution,projectTitle,projectDesc).send({from:account})
  .on('transactionHash', function(receipt){ 
    onSuccess()
  })
  .on('error', function(error){ 
    onError(error.message)
  })

}

export const getAllFunding = async(CrowdFundingContract,web3,dispatch) =>{
   
  const fundingProjectList = await CrowdFundingContract.methods.returnAllProjects().call()
  
   const projectContracts = [];
   const projects = [];

   await Promise.all(fundingProjectList.map(async (data)=>{
    var projectConnector = new web3.eth.Contract(Project.abi,data);
    const details = await projectConnector.methods.getProjectDetails().call()
    projectContracts.push(projectConnector);

    const formattedProjectData = projectDataFormatter(details)
    projects.push(formattedProjectData)

   }))

   dispatch(actions.projectContractsLoaded(projectContracts));
   dispatch(actions.projectsLoaded(projects));

}