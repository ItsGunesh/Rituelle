import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { HabitContext } from '../../../Context/HabitContextProvider';

const HabitCard = ({ name, isComplete, toggleHabit }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <div
      className={`${isComplete?'bg-green-100':''} flex justify-left rounded-xl  items-center mt-4 border-gray-400 shadow-sm border-1 transition-transform duration-100 hover:scale-101 hover:shadow-md`}
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
