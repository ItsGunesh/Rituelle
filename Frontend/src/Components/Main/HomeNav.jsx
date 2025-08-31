import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeNav = () => {
    const navigate = useNavigate()

    const navHome = ()=>{
        navigate("/gym")
    }
  return (
    <>
      <div className='flex justify-between items-center p-4'>
        <div className='flex flex-col gap-1'>
            <p className='text-4xl font-bold'>Habit Progress Tracker</p>
            <p className='text-lg font-semibold'>Track your habit progress</p>
        </div>
        <div className='border py-2 px-4 rounded-2xl bg-slate-800 text-center'>
            <p className='font-bold text-white' onClick={navHome}>Go to Gym</p>
        </div>
      </div>
    </>
  )
}


export default HomeNav
