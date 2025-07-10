import React, { useState, useContext } from 'react'
import DailyProgress from './DailyProgress'
import HabitCard from './HabitCard'
import { HabitContext } from '../../../Context/HabitContextProvider.jsx'

const TaskIndex = () => {

  const { habits, setHabits } = useContext(HabitContext);

  return (
    <>
      <div className='w-[20%]  py-2 px-4 rounded-2xl bg-gray-100 shadow-xl border-gray-400 border-1'>
        <h3 className='font-bold text-xl px-4'>Todays Habits</h3>
        <DailyProgress/>
        {habits.map((habit, idx) => (
          <HabitCard
            key={habit.id}
            id={habit.id}
            name={habit.name}
            habitIndex={idx}
          />
        ))}
      </div>
    </>
  )
}

export default TaskIndex
