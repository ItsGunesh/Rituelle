import React from 'react'
import Habits from './Habits'

const HabitsIndex = () => {
  return (
    <>
      <div className='p-4 bg-gray-100 w-[90%] h-fit border-1 rounded-2xl border-gray-400 shadow-xl'>
        <h3 className='font-bold text-2xl py-4'>Habits Heatmap</h3>
        <Habits/>
      </div>
    </>
  )
}

export default HabitsIndex
