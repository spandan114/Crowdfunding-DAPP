import React,{useState} from 'react'
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux'
import { contribute } from '../redux/interactions';
import { etherToWei } from '../helper/helper';
import { toastSuccess,toastError } from '../helper/toastMessage'

const colorMaker = (state) =>{
    if(state === 'Fundraising'){
        return 'bg-cyan-500'
    }else if(state === 'Expired'){
        return 'bg-red-500'
    }else{
        return 'bg-emerald-500'
    }
}

const FundRiserCard = ({props}) => {

  const [btnLoader, setBtnLoader] = useState(false)
  const [amount, setAmount] = useState(0)
  const dispatch = useDispatch();
  const crowdFundingContract = useSelector(state=>state.fundingReducer.contract)
  const account = useSelector(state=>state.web3Reducer.account)

  const contributeAmount = (projectId,minContribution) =>{

    if(amount < minContribution){
      toastError(`Minimum contribution amount is ${minContribution}`);
      return;
    }

    setBtnLoader(projectId)
    const contributionAmount = etherToWei(amount);

    const data = {
      contractAddress:projectId,
      amount:contributionAmount,
      account:account
    }
    const onSuccess = () =>{
      setBtnLoader(false)
      setAmount(0)
      toastSuccess(`Successfully contributed ${amount} ETH`)
    }
    const onError = (message) =>{
      setBtnLoader(false)
      toastError(message)
    }
    contribute(crowdFundingContract,data,dispatch,onSuccess,onError)
  }

  return (
    <div className="card relative overflow-hidden my-4">
    <div className={`ribbon ${colorMaker(props.state)}`}>{props.state}</div>
    <Link href={`/project-details/${props.address}`} >
      <h1 className="font-sans text-xl text-gray font-semibold hover:text-sky-500 hover:cursor-pointer">{props.title}</h1>
    </Link>
    <p className="font-sans text-sm text-stone-800 tracking-tight">{props.description}</p>
    <div className="flex flex-col lg:flex-row">
      <div className="inner-card my-6 w-full lg:w-2/5">
        <p className="text-md font-bold font-sans text-gray">Targeted contribution</p>
        <p className="text-sm font-bold font-sans text-gray-600 ">{props.goalAmount} ETH </p>
        <p className="text-md font-bold font-sans text-gray">Deadline</p>
        <p className="text-sm font-bold font-sans text-gray-600 ">{props.deadline}</p>
      </div>
      <div className="inner-card my-6 w-full lg:w-3/5">
        <label className="text-sm text-gray-700 font-semibold">Contribution amount :</label>
        <div className="flex flex-row">
          <input type="number" placeholder="Type here" value={amount} onChange={(e)=>setAmount(e.target.value)} disabled={btnLoader === props.address} className="input rounded-l-md" />
         
          <button className="button" 
          onClick={()=>contributeAmount(props.address,props.minContribution)}
          disabled={btnLoader === props.address}
          >
            {btnLoader === props.address?"Loading...":"Contribute"}
          </button>

        </div>
        <p className="text-sm text-red-600"> <span className="font-bold">NOTE : </span> Minimum contribution is {props.minContribution} ETH </p>
      </div>
    </div>

    <div className="w-full bg-gray-200 rounded-full">
      <div className="progress" style={{ width: `${props.progress}%` }}> {props.progress}% </div>
    </div>
  </div>
  )
}

export default FundRiserCard