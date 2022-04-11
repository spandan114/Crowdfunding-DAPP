import React from 'react'
import authWrapper from '../../helper/authWrapper'

const ProjectDetails = () => {
  return (
    <div className="px-2 py-4 flex flex-col lg:px-12 lg:flex-row ">
    <div className="lg:w-7/12 my-2 lg:my-0 lg:mx-2">
        <div className="card relative overflow-hidden my-4">
          <div className="ribbon bg-emerald-500">Popular</div>
          <h1 className="font-sans text-xl text-gray font-semibold hover:text-sky-500 hover:cursor-pointer">
            Project title
          </h1>
          <p className="font-sans text-sm text-stone-800 tracking-tight">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </p>
          <div className="flex flex-col lg:flex-row">
            <div className="inner-card my-6 w-full lg:w-2/5">
              <p className="text-md font-bold font-sans text-gray">Targeted contribution</p>
              <p className="text-sm font-bold font-sans text-gray-600 ">100000 ETH </p>
              <p className="text-md font-bold font-sans text-gray">Deadline</p>
              <p className="text-sm font-bold font-sans text-gray-600 ">2022-06-17 10:15 PM</p>
            </div>
            <div className="inner-card my-6 w-full lg:w-3/5">
              <label className="text-sm text-gray-700 font-semibold">Contribution amount :</label>
              <div className="flex flex-row">
                <input type="number" placeholder="Type here" className="input rounded-l-md" />
                <button className="button">Contribute</button>
              </div>
              <p className="text-sm text-red-600"> <span className="font-bold">NOTE : </span> Minimum contribution is 2 ETH </p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full">
            <div className="progress" style={{ width: "25%" }}> 25% </div>
          </div>
        </div>
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