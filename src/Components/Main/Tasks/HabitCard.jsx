import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { HabitContext } from '../../../Context/HabitContextProvider';

const HabitCard = ({ name, days }) => {
  const [isComplete, setIsComplete] = useState(false);
  const { setHabits } = useContext(HabitContext);

  const updateHabitStatus = () => {
    setIsComplete(!isComplete);
    setHabits
  };

  return (
    <div
      className={`flex justify-left border-1 rounded-xl items-center mt-4  border-gray-400 shadow-sm ${isComplete ? 'border-green-500 bg-green-50 text-black' : 'border-gray-300'}`}
      onClick={updateHabitStatus}
    >
      <div className='px-4 py-2'>
        <FontAwesomeIcon icon={faCircleCheck} className='text-3xl' />
      </div>
      <div className='flex flex-col gap-0 py-1'>
        <p className='text-lg font-bold'>{name}</p>
        <p className='text-xs'>{days}</p>
      </div>
    </div>
  );
};

export default HabitCard;
