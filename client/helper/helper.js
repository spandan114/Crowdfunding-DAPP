
import web3 from "web3";

export const weiToEther = (num) =>{
    return web3.utils.fromWei(num, 'ether')
}

export const etherToWei = (num) => {
  const weiBigNumber = web3.utils.toWei(num, 'ether');
  const wei = weiBigNumber.toString();
  return wei
}