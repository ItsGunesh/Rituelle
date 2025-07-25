import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { HabitContext } from '../../../Context/HabitContextProvider';

const HabitCard = ({ name, isComplete, toggleHabit }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <div
      className={`flex justify-left border-1 rounded-xl  items-center mt-4 bg-gray-100 border-gray-400 shadow-sm ${isComplete ? ' border-2 border-gray-900' : 'border-2 border-gray-900'} `}
      onClick={() => {
        toggleHabit();
        setToggle(prev => !prev);
      }}
    >
      <div className='px-4 py-2' >
        {/* <FontAwesomeIcon icon={faCircleCheck} className={`text-3xl ${isComplete ? ' text-black' : ' text-gray-100'} `}  /> */}
        {isComplete ? <FontAwesomeIcon icon={faCircleCheck} className='text-3xl text-gray-900' /> : <FontAwesomeIcon icon={faCircleDot} className={`text-3xl ${toggle ? 'text-3xl text-gray-900' : 'text-3xl text-gray-100'}`} />}
      </div>
      <div className='flex flex-col gap-0 py-1'>
        <p className={`text-lg font-bold ${isComplete ? 'text-gray-900' : 'text-gray-900'}`}>{name}</p>
      </div>
    </div>
  );
};

export default HabitCard;
