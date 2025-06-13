import React from 'react'
import DailyProgress from './DailyProgress'
import HabitCard from './HabitCard'

const TaskIndex = () => {

  const habits = ["Wake Up", "Meditate", "Gym", "DSA", "Web Dev", "Diet", "Junk", "Social", "Skin Care", "Reading"]

  return (
    <>
      <div className='w-[20%]  py-2 px-4 rounded-2xl bg-gray-100 shadow-xl border-gray-400 border-1'>
        <h3 className='font-bold text-xl px-4'>Todays Habits</h3>
        <DailyProgress/>
        {habits.map((item,ind) => (
          <HabitCard key={ind} name={item} days={ind} />
        ))}
      </div>
    </>
  )
}

export default TaskIndex
