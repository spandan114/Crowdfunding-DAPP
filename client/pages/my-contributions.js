import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import authWrapper from '../helper/authWrapper'
import { getMyContributionList } from '../redux/interactions'
import Link from "next/link";

const MyContributions = () => {

    const crowdFundingContract = useSelector(state=>state.fundingReducer.contract)
    const account = useSelector(state=>state.web3Reducer.account)

    const [contributions, setContributions] = useState(null)

    useEffect(() => {
        (async() => {
            if(crowdFundingContract){
                var res = await getMyContributionList(crowdFundingContract,account)
                console.log(res)
                setContributions(res)
            }
        })();
    }, [crowdFundingContract])

  return (
    <div className="px-2 py-4 flex flex-wrap lg:px-12 lg:flex-row ">
        {
          contributions?
            contributions.length > 0?
                contributions.map((data,i)=>(
                    <div className='inner-card my-2 flex flex-row w-full lg:w-1/4' key={i}>
                        <div className='lg:w-1/5'>
                            <div className='p-6 w-8 h-8 mx-auto my-auto rounded-md bg-slate-300 '></div>
                        </div>
                        <div className='lg:w-4/5'>
                            <Link href={`/project-details/${data.projectAddress}`}><p className='text-md font-bold text-gray-800 w-40 truncate cursor-pointer '>{data.projectAddress}</p></Link>
                            <p className='text-sm font-bold text-gray-500'>{data.amount} ETH</p>
                        </div>
                    </div>
                ))
            :
            <p className='text-center'>You didn't contributed in any project yet !</p>
        :
        <div className="w-full"> <Loader/></div>
       
        }
    </div>
  )
}

export default authWrapper(MyContributions)