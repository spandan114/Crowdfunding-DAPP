import {useEffect} from 'react'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {wrapper} from '../redux/store'
import { useDispatch } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import { getAllFunding, loadAccount, loadCrowdFundingContract, loadWeb3 } from '../redux/interactions';

function getLibrary(provider) {
  return new Web3(provider)
}


function MyApp({ Component, pageProps }) {

  const dispatch = useDispatch()

  useEffect(() => {
    loadBlockchain()
  }, [])
  

  const loadBlockchain = async() =>{
      const web3 = await loadWeb3(dispatch)
      const account = await loadAccount(web3,dispatch)
      const crowdFundingContract = await loadCrowdFundingContract(web3,dispatch)
      await getAllFunding(crowdFundingContract,web3,dispatch)
  }
  
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ToastContainer/>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default wrapper.withRedux(MyApp)
