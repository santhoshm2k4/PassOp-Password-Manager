import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-[#0a0a23] text-white'>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14 ">

        <div className="logo font-bold text-2xl">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
          
          </div>
        
        <button className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center px-1 ring-white ring-1'>
          <img className='invert w-10 p-1' src="icons/github.svg" alt="github" />
          <span className="font-bold px-2">GitHub</span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar
