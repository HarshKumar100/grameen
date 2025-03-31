
import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1661438370766-8b68ab6cd632?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className='w-16 ml-8' src="https://sdmntprwestus.oaiusercontent.com/files/00000000-a1d4-5230-9172-74df9037899b/raw?se=2025-03-31T18%3A49%3A29Z&sp=r&sv=2024-08-04&sr=b&scid=a8867443-e0f4-54f3-a8ad-18405f05cac5&skoid=ac1d63ad-0c69-4017-8785-7a50eb04382c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-31T06%3A31%3A49Z&ske=2025-04-01T06%3A31%3A49Z&sks=b&skv=2024-08-04&sig=IWWF7K%2Bqpv8MSF8L64Z2aI5L7NoVMS3B4SoTAmuchJk%3D" alt="" />
        <div className='bg-white pb-8 py-4 px-4'>
          <h2 className='text-[30px] font-semibold'>Get Started with GrameenGo</h2>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start