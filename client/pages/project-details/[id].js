import { useRouter } from 'next/router'
import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import FundRiserCard from '../../components/FundRiserCard'
import Loader from '../../components/Loader'
import authWrapper from '../../helper/authWrapper'
import { getAllWithdrawRequest, getContributors } from '../../redux/interactions'

const ProjectDetails = () => {

  const router = useRouter()
  const { id } = router.query
  const web3 = useSelector(state=>state.web3Reducer.connection)
  const projectsList = useSelector(state=>state.projectReducer.projects)
  const filteredProject = projectsList?.filter(data =>  data.address === id)

  const [contributors, setContributors] = useState(null)
  const [withdrawReq, setWithdrawReq] = useState(null)

  useEffect(() => {
    if(id){

      const onSuccess = (data) =>{
        setContributors(data)
      }
      const onError = (error) =>{
        console.log(error)
      }

      getContributors(web3,id,onSuccess,onError)

      const loadWithdrawRequests = (data) =>{
        setWithdrawReq(data)
      }
      getAllWithdrawRequest(web3,id,loadWithdrawRequests)
    }
  }, [id])
  

  return (
    <div className="px-2 py-4 flex flex-col lg:px-12 lg:flex-row ">
    <div className="lg:w-7/12 my-2 lg:my-0 lg:mx-2">
        {
          filteredProject?
            <FundRiserCard props={filteredProject[0]}/>
          :
          <Loader/>
        }

        <div>
          {
            withdrawReq?
              withdrawReq.length > 0?
                <div>
                  <h1 className="font-sans text-xl text-gray font-semibold">Withdraw requests</h1>
                </div>
              :<p>Withdraw requests not found</p>
            :<Loader/>
          }
          
        </div>

    </div>
    <div className="card lg:w-5/12 h-screen my-4 overflow-y-hidden hover:overflow-y-auto">
        <h1 className="font-sans font-bold text-xl">All contributors</h1>
        {
          contributors?
            contributors.length > 0?
              contributors.map((data,i)=>(
                  <div className='inner-card my-2 flex flex-row' key={i}>
                    <div className='lg:w-1/5'>
                      <div className='p-6 w-8 h-8 mx-auto my-auto rounded-md bg-slate-300 '></div>
                    </div>
                    <div className='lg:w-4/5'>
                        <p className='text-md font-bold text-gray-800 w-40 truncate '>{data.contributor}</p>
                        <p className='text-sm font-bold text-gray-500'>{data.amount} ETH</p>
                    </div>
                </div>
              ))
              :<p>Contributors not found</p>
            :<Loader/>
        }

    </div>
  </div>
  )
}

export default authWrapper(ProjectDetails)