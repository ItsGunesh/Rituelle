import React from 'react'
import ProgressBar from '../../ProgressBar'
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MaxMin = ({habit , type , value,css}) => {
  return (
    <>
      <div className={`rounded-2xl w-full shadow-lg ${css}`}>
        <div className='p-4'>
          <h3 className='text-2xl font-bold text-center'>{habit}</h3>
          <p className='text-lg font-bold text-center'>{type}</p>
          {/* <ProgressBar value={value}/> */}
          <div className='flex justify-center'>
            {/* <FontAwesomeIcon icon={faChartLine}  className='text-9xl'/> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default MaxMin
