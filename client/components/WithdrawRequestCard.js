import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toastError, toastSuccess } from '../helper/toastMessage';
import { voteWithdrawRequest,withdrawAmount } from '../redux/interactions';

const colorMaker = (state) =>{
    if(state === 'Pending'){
        return 'bg-blue-600'
    }else{
        return 'bg-cyan-500'
    }
}

const WithdrawRequestCard = ({props,withdrawReq, setWithdrawReq,contractAddress}) => {

  const dispatch = useDispatch();
  const [btnLoader, setBtnLoader] = useState(false);
  
  const account = useSelector(state=>state.web3Reducer.account)
  const web3 = useSelector(state=>state.web3Reducer.connection)
  

  const withdrawBalance = (reqId) =>{
    setBtnLoader(reqId)
      var data = {
        contractAddress:contractAddress,
        reqId:reqId,
        account:account,
        amount:props.amount
      }
      const onSuccess = () =>{
        setBtnLoader(false)
        const filteredReq = withdrawReq.filter(data=> data.requestId === props.requestId)
        var filteredVal = filteredReq[0]
        filteredVal.status = "Completed"
        setWithdrawReq([...withdrawReq,filteredVal])
        toastSuccess(`Vote successfully added for request id ${reqId}`)
      }
      const onError = (message) =>{
        setBtnLoader(false)
        toastError(message)
      }
      withdrawAmount(web3,dispatch,data,onSuccess,onError)
  }

  const vote = (reqId) =>{
    setBtnLoader(reqId)
      var data = {
        contractAddress:contractAddress,
        reqId:reqId,
        account:account
      }
      const onSuccess = () =>{
        setBtnLoader(false)
        const filteredReq = withdrawReq.filter(data=> data.requestId === props.requestId)
        var filteredVal = filteredReq[0]
        filteredVal.totalVote = Number(filteredVal.totalVote)+1
        setWithdrawReq([...withdrawReq,filteredVal])
        toastSuccess(`Vote successfully added for request id ${reqId}`)
      }
      const onError = (message) =>{
        setBtnLoader(false)
        toastError(message)
      }
      voteWithdrawRequest(web3,data,onSuccess,onError)
  }

  return (
    <div className="card relative overflow-hidden my-4">
    <div className={`ribbon ${colorMaker(props.status)}`}>{props.status}</div>
    <h1 className="font-sans text-xl text-gray font-semibold">{props.desc}</h1>
    <div className="flex flex-col lg:flex-row">
      <div className="inner-card my-6 w-full lg:w-2/5">
        <p className="text-md font-bold font-sans text-gray">Requested amount</p>
        <p className="text-sm font-bold font-sans text-gray-600 ">{props.amount} ETH </p>
        <p className="text-md font-bold font-sans text-gray">Total vote</p>
        <p className="text-sm font-bold font-sans text-gray-600 ">{props.totalVote}</p>
      </div>
      <div className="inner-card my-6 w-full lg:w-3/5">
        <p className="text-md font-bold font-sans text-gray">Reciptant address</p>
        <p className="text-sm font-bold font-sans text-gray-600 w-40 truncate ">{props.reciptant}</p>
        {
            account === props.reciptant?
            <button className="withdraw-button" onClick={()=>withdrawBalance(props.requestId)} disabled={props.status==="Completed"}>
              {btnLoader === props.requestId?"Loading...":"Withdraw"}
            </button>
            :
            <button className="withdraw-button" onClick={()=>vote(props.requestId)}>
               {btnLoader === props.requestId?"Loading...":"Vote"}
            </button>
         }

      </div>
    </div>

  </div>
  )
}

export default WithdrawRequestCard