import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import FundRiserCard from '../../components/FundRiserCard'
import Loader from '../../components/Loader'
import authWrapper from '../../helper/authWrapper'

const ProjectDetails = () => {

  const router = useRouter()
  const { id } = router.query
  const projectsList = useSelector(state=>state.projectReducer.projects)

  const filteredProject = projectsList?.filter(data =>  data.address === id)

  return (
    <div className="px-2 py-4 flex flex-col lg:px-12 lg:flex-row ">
    <div className="lg:w-7/12 my-2 lg:my-0 lg:mx-2">
        {
          filteredProject?
            <FundRiserCard props={filteredProject[0]}/>
          :
          <Loader/>
        }
    </div>
    <div className="card lg:w-5/12 h-screen my-4 overflow-y-hidden hover:overflow-y-auto">
        <h1 className="font-sans font-bold text-xl">All contributors</h1>
        {
            Array(10).fill(1).map((data,i)=>(
                <div className='inner-card my-2 flex flex-row' key={i}>
                  <div className='lg:w-1/5'>
                    <div className='p-6 w-8 h-8 mx-auto my-auto rounded-md bg-slate-300 '></div>
                  </div>
                  <div className='lg:w-4/5'>
                      <p className='text-md font-bold text-gray-800'>wallet address</p>
                      <p className='text-sm font-bold text-gray-500'>60 ETH</p>
                  </div>
               </div>
            ))
        }

    </div>
  </div>
  )
}

export default authWrapper(ProjectDetails)