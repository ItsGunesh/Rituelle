import React from 'react'
import Cell from './Cell'

const Habits = () => {
  const habits = ["Wake Up", "Meditate", "Gym", "DSA", "Web Dev", "Diet", "Junk", "Social", "Skin Care", "Reading"]
  return (
    <>
      <div className='p-4 border-2 rounded-2xl border-gray-400 flex gap-4 bg-white'>
        <div className='text-xs font-bold w-fit flex flex-col gap-0'>
          {habits.map((item,ind)=>(
            <p key={item + ind}>{item}</p>
          ))}
        </div>
        <div className='flex gap-1'>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>
          <Cell/>

        </div>
      </div>
      <div className='flex justify-between text-sm font-bold pt-3 text-gray-600'>
        <p>Days Completed</p>
        <p>Max Streak</p>
        <p>Current Streak</p>
      </div>
    </>
  )
}

export default Habits

