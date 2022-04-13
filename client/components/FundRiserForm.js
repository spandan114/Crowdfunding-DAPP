import React, { useState } from 'react'
import moment from 'moment'
import { startFundRaising } from '../redux/interactions'
import { useDispatch, useSelector } from 'react-redux'
import { etherToWei } from '../helper/helper'

const FundRiserForm = () => {


    const crowdFundingContract = useSelector(state=>state.fundingReducer.contract)
    const account = useSelector(state=>state.web3Reducer.account)
    const dispatch = useDispatch()

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [targetedContributionAmount,setTargetedContributionAmount] = useState("")
    const [minimumContributionAmount,setMinimumContributionAmount] = useState("")
    const [deadline,setDeadline] = useState("")

    const riseFund = (e) =>{
       e.preventDefault();
       const unixDate = moment(deadline).valueOf()
    //    var dateString = moment(unixDate).format("DD/MM/YYYY H:mm");

       startFundRaising(
           crowdFundingContract,
           etherToWei(minimumContributionAmount),
           unixDate,
           etherToWei(targetedContributionAmount),
           title,
           description,
           account,
           dispatch
        )
    }

  return (
    <>
        <h1 className="font-sans font-bold text-xl">Start a fund riser fot free</h1>
        <form onSubmit={(e)=>riseFund(e)}>
            <div className="form-control my-1">
                <label className="text-sm text-gray-700">Title :</label>
                <input type="text" placeholder="Type here" className="form-control-input border-neutral-400 focus:ring-neutral-200" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
            </div>
            <div className="form-control my-1">
                <label className="text-sm text-gray-700">Description :</label>
                <textarea placeholder="Type here" className="form-control-input border-neutral-400 focus:ring-neutral-200" value={description} onChange={(e)=>setDescription(e.target.value)} required></textarea>
            </div>
            <div className="form-control my-1">
                <label className="text-sm text-gray-700">Targeted contribution amount :</label>
                <input type="number" placeholder="Type here" className="form-control-input border-neutral-400 focus:ring-neutral-200" value={targetedContributionAmount} onChange={(e)=>setTargetedContributionAmount(e.target.value)} required/>
            </div>
            <div className="form-control my-1">
                <label className="text-sm text-gray-700">Minimum contribution amount :</label>
                <input type="number" placeholder="Type here" className="form-control-input border-neutral-400 focus:ring-neutral-200" value={minimumContributionAmount} onChange={(e)=>setMinimumContributionAmount(e.target.value)} required/>
            </div>
            <div className="form-control my-1">
                <label className="text-sm text-gray-700">Deadline :</label>
                <input type="date" placeholder="Type here" className="form-control-input border-neutral-400 focus:ring-neutral-200" value={deadline} onChange={(e)=>setDeadline(e.target.value)} required/>
            </div>

            <button className="p-2 w-full bg-[#F56D91] text-white rounded-md hover:bg-[#d15677]" >Rise fund</button>
        </form>
    </>
  )
}

export default FundRiserForm