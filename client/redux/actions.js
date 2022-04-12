import * as types from "./types"

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

export const crowdFundingContractLoaded = (contract) =>{
    return{
        type:types.CROWD_FUNDING_CONTRACT_LOADED,
        payload:contract
    }
}