import { combineReducers } from "redux";
import * as types from "./types";
const initialState = {};

export const web3Reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case types.WEB3_LOADED:
      return {
        ...state,
        connection: action.payload,
      };
    case types.WALLET_ADDRESS_LOADED:
      return {
        ...state,
        account: action.payload,
      };
    default:
      return state;
  }
};

export const fundingReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {

    default:
      return state;
  }
};

export const projectReducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {

    default:
      return state;
  }
};


export default combineReducers({
    web3Reducer,
    fundingReducer,
    projectReducer
  });