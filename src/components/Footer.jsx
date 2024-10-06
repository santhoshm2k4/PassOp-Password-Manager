import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#0a0a23] text-white flex flex-col justify-center items-center pb-2 w-full '>
        <div className="logo font-bold text-2xl">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
          
          </div>
        <div className='flex justify-center items-center'>
      Created with <img className='w-5 mx-2 ' src="icons/heart.svg" alt="" /> by Santhosh
        </div>
    </div>
  )
}

export default Footer
