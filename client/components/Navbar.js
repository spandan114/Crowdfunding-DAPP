import {useState} from 'react'
import Link from "next/link";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Navbar = () => {

    const router = useRouter()
    const [openMenu,setOpenMenu] = useState(false);
    const account = useSelector(state=>state.web3Reducer.account)

  return (
    <div>
        {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
        <nav className="bg-[#F7F5F2]">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* <!-- Mobile menu button--> */}
                <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-greay hover:bg-[#F7C984] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={()=>setOpenMenu(!openMenu)}>
                <span className="sr-only">Open main menu</span>
                <i className="fa-solid fa-bars"></i>
                </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                      <h4 className='font-mono text-xl text-greay font-bold hidden lg:block'>CROWD FUNDING</h4>
                </div>
                <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                    <Link href="/dashboard"  ><span className={`${router.pathname === "/dashboard"?"bg-[#F7C984]":""} text-greay px-3 py-2 rounded-md text-sm font-medium hover:cursor-pointer hover:bg-[#F7C984] hover:text-greay`}>Dashboard</span></Link>
                    <Link href="/my-contributions"><span className={`${router.pathname === "/my-contributions"?"bg-[#F7C984]":""} text-greay px-3 py-2 rounded-md text-sm font-medium hover:cursor-pointer hover:bg-[#F7C984] hover:text-greay`}>My contribution</span></Link>
                </div>
                </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button" className="p-1 w-40 truncate rounded-full text-greay hover:text-greay ">
                  <span >{account}</span>
                </button>

                {/* <!-- Profile  --> */}
                <div className="ml-3 relative">
                <div>
                    <button type="button" className="bg-[#F7C984] flex text-sm rounded-md focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full" ></div>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className={`sm:hidden ${!openMenu?"hidden":""}`} id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="bg-[#F7C984] text-greay block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

            <a href="#" className="text-greay hover:bg-[#F7C984] hover:text-greay block px-3 py-2 rounded-md text-base font-medium">Team</a>

            <a href="#" className="text-greay hover:bg-[#F7C984] hover:text-greay block px-3 py-2 rounded-md text-base font-medium">Projects</a>

            <a href="#" className="text-greay hover:bg-[#F7C984] hover:text-greay block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
            </div>
        </div>
        </nav>

    </div>
  )
}

export default Navbar