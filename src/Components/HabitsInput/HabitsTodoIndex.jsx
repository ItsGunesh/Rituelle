import React from 'react'
import HabitsTodo from './HabitsTodo'
import Navigator from '../Navigator/Navigator'

const HabitsTodoIndex = () => {
  return (
    <>
      <div className='w-[100%] h-screen bg-gray-200 flex flex-col'>
        <div>
        <Navigator/>
      </div>
      <div className='flex w-[100%] flex-1 items-center justify-center'>
        <HabitsTodo/>
      </div>
      </div>
    </>
  )
}

export default HabitsTodoIndex
