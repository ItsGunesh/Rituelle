import React, { useContext } from 'react';
import { HabitContext } from '../../../Context/HabitContextProvider.jsx';

const Cell = () => {
  const { habits, setHabits } = useContext(HabitContext);

  const toggleHabit = (index) => {
    setHabits(prevHabits =>
      prevHabits.map((habit, i) =>
        i === index ? { ...habit, isComplete: !habit.isComplete } : habit
      )
    );
  };

  return (
    <div className='flex flex-col items-center gap-1 py-0.5'>
      {habits.map((habit, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-sm cursor-pointer ${
            habit.isComplete ? 'bg-green-500' : 'bg-gray-400'
          }`}
          // onClick={() => toggleHabit(index)}
        ></div>
      ))}
    </div>
  );
};

export default Cell;
