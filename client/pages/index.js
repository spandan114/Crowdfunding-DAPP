import {useEffect} from 'react';
import { useWeb3React } from "@web3-react/core"
import { injected } from "../helper/walletConnector"
import { useRouter } from 'next/router';

export default function Home() {

  const router = useRouter()
  const { active, account, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    if(account){
    console.log(account)
    router.push("/dashboard")
    }
  }, [account])
  

  // async function disconnect() {
  //   try {
  //     deactivate()
  //   } catch (ex) {
  //     console.log(ex)
  //   }
  // }

  return (
    <div className="flex flex-col items-center justify-center my-40">
    <button onClick={connect} className="p-4 my-10 text-lg font-bold text-white rounded-md w-56 bg-[#8D8DAA] drop-shadow-md hover:bg-[#b1b1d6] hover:drop-shadow-xl">Connect to MetaMask</button>
    {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}

  </div>
  )
}
