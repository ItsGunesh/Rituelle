import React, { useState, useContext } from 'react'
import DailyProgress from './DailyProgress'
import HabitCard from './HabitCard'
import { HabitContext } from '../../../Context/HabitContextProvider.jsx'

const TaskIndex = () => {

  const { habits, setHabits } = useContext(HabitContext);

  const updateHabitStatus = (idx) => {
    setHabits(prevHabits => 
      prevHabits.map((habit, i) =>
        i === idx ? { ...habit, isComplete: !habit.isComplete } : habit
      )
    );
  };

  return (
    <>
      <div className='w-[20%]  py-2 px-4 rounded-2xl bg-gray-100 shadow-xl border-gray-400 border-1'>
        <h3 className='font-bold text-xl px-4'>Todays Habits</h3>
        <DailyProgress/>
        {habits.map((habit, idx) => (
          <HabitCard
            key={habit.id}
            name={habit.name}
            isComplete={habit.isComplete}
            habitIndex={idx}
            updateHabitStatus={updateHabitStatus}
          />
        ))}
      </div>
    </>
  )
}

export default TaskIndex
