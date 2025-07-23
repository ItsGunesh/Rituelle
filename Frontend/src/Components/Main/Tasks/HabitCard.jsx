import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { HabitContext } from '../../../Context/HabitContextProvider';

const HabitCard = ({ name, isComplete, toggleHabit }) => {
  return (
    <div
      className={`flex justify-left border-1 rounded-xl  items-center mt-4  border-gray-400 shadow-sm ${isComplete ? ' bg-gray-500 text-white' : 'border-gray-300 bg-white'}`}
      onClick={toggleHabit}
    >
      <div className='px-4 py-2'>
        <FontAwesomeIcon icon={faCircleCheck} className={`text-3xl `}  />
      </div>
      <div className='flex flex-col gap-0 py-1'>
        <p className='text-lg font-bold'>{name}</p>
      </div>
    </div>
  );
};

export default HabitCard;
