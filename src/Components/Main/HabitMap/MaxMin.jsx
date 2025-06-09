import React from 'react'
import ProgressBar from '../../ProgressBar'
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MaxMin = ({habit , type , value}) => {
  return (
    <>
      <div className='bg-white border-1 border-gray-400 rounded-2xl w-[22%] shadow-lg'>
        <div className='p-4'>
          <h3 className='text-2xl font-bold'>{habit}</h3>
          <p className='text-xs '>{type}</p>
          <ProgressBar value={value}/>
          <div className='flex justify-center'>
            <FontAwesomeIcon icon={faChartLine}  className='text-9xl'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default MaxMin
