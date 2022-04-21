import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { connectWithWallet } from '../helper/helper';
import { loadAccount } from '../redux/interactions';

export default function Home() {

  const router = useRouter();
  const dispatch = useDispatch();
  const web3 = useSelector(state => state.web3Reducer.connection)

  const connect = () =>{
    const onSuccess = () =>{
      loadAccount(web3,dispatch)
      router.push('/dashboard')
    }
    connectWithWallet(onSuccess)
  }

  useEffect(() => {
     (async()=>{
      if(web3){
        const account = await loadAccount(web3,dispatch)
        if(account.length > 0){
          router.push('/dashboard')
        }
      }
     })()
  }, [web3])
  

  return (
    <div className="flex flex-col items-center justify-center my-40">
    <button className="p-4 my-10 text-lg font-bold text-white rounded-md w-56 bg-[#8D8DAA] drop-shadow-md hover:bg-[#b1b1d6] hover:drop-shadow-xl" onClick={()=>connect()}>Connect to MetaMask</button>
    {/* {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>} */}

  </div>
  )
}
