import React, { useState } from 'react'

const Cell = () => {
  const habits = ["Wake Up", "Meditate", "Gym", "DSA", "Web Dev", "Diet", "Junk", "Social", "Skin Care", "Reading"]
  const [completedHabits, setCompletedHabits] = useState(new Array(habits.length).fill(false))

  const toggleHabit = (index) => {
    const newCompletedHabits = [...completedHabits]
    newCompletedHabits[index] = !newCompletedHabits[index]
    setCompletedHabits(newCompletedHabits)
  }

  return (
    <div className='flex flex-col items-center gap-1 py-0.5'>
      {habits.map((item, index) => {
        return (
          <div
            key={index}
            className={`w-3 h-3 rounded-sm cursor-pointer ${
              completedHabits[index] ? 'bg-green-500' : 'bg-gray-400'
            }`}
            onClick={() => toggleHabit(index)}
          ></div>
        )
      })}
    </div>
  )
}

export default Cell
