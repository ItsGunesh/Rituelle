import React from 'react'
import { useNavigate } from 'react-router-dom'

const GymNav = () => {
    const navigate = useNavigate()

    const navHome = ()=>{
        navigate("/dashboard")
    }
  return (
    <>
      <div className='flex justify-between items-center p-4'>
        <div className='flex flex-col gap-1'>
            <p className='text-4xl font-bold'>Gym Progress Tracker</p>
            <p className='text-lg'>Track your workout progress and visualize your gains</p>
        </div>
        <div className='border py-2 px-4 rounded-2xl bg-slate-800'>
            <p className='font-bold text-white' onClick={navHome}>Back to Habits</p>
        </div>
      </div>
    </>
  )
}

export default GymNav
