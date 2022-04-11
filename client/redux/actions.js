import * as types from "./types"

export const web3Loaded = (web3) =>{
    return{
        type:types.WEB3_LOADED,
        payload:web3
    }
}