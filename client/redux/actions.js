import * as types from "./types"

// Web3 actions

export const web3Loaded = (web3) =>{
    return{
        type:types.WEB3_LOADED,
        payload:web3
    }
}

export const walletAddressLoaded = (address) =>{
    return{
        type:types.WALLET_ADDRESS_LOADED,
        payload:address
    }
}

// Crowd funding actions

export const crowdFundingContractLoaded = (contract) =>{
    return{
        type:types.CROWD_FUNDING_CONTRACT_LOADED,
        payload:contract
    }
}

// Project actions

export const projectContractsLoaded = (contracts)=>{
    return{
        type:types.PROJECT_CONTRACTS_LOADED,
        payload:contracts
    }
}

export const projectsLoaded = (projects)=>{
    return{
        type:types.PROJECTS_LOADED,
        payload:projects
    }
}

export const newProjectContractsLoaded = (contract)=>{
    return{
        type:types.NEW_PROJECT_CONTRACT_LOADED,
        payload:contract
    }
}

export const newProjectsLoaded = (project)=>{
    return{
        type:types.NEW_PROJECT_LOADED,
        payload:project
    }
}

export const amountContributor = (data)=>{
    return{
        type:types.INCREASE_PROGRESS,
        payload:data
    }
}

export const withdrawContractBalance = (data)=>{
    return{
        type:types.WITHDRAW_BALANCE,
        payload:data
    }
}
