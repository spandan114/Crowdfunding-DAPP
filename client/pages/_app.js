import {useEffect} from 'react'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {wrapper} from '../redux/store'
import { useDispatch } from 'react-redux';
import { getAllFunding, loadAccount, loadCrowdFundingContract, loadWeb3, subscribeCrowdFundingEvents } from '../redux/interactions';


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
    <>
      <ToastContainer/>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(MyApp)
