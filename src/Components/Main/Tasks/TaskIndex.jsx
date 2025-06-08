import React from 'react'
import DailyProgress from './DailyProgress'
import HabitCard from './HabitCard'

const TaskIndex = () => {
  return (
    <>
      <div className='w-[20%]  py-2 px-4 rounded-2xl bg-gray-100 shadow-xl border-gray-400 border-1'>
        <h3 className='font-bold text-xl px-4'>Todays Habits</h3>
        <DailyProgress/>
        <HabitCard/>
        <HabitCard/>
        <HabitCard/>
        <HabitCard/>
        <HabitCard/>
        <HabitCard/>
        <HabitCard/>
        <HabitCard/>
        <HabitCard/>
      </div>
    </>
  )
}

export default TaskIndex
