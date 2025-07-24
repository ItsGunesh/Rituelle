import React from 'react'

const DailyProgress = ({data}) => {
  return (
    <>
      <div>
        <div className='flex flex-col items-center justify-between px-4 rounded-xl'>
            <p className='font-bold'>Today's Progress</p>
            <p className='font-bold'>{data} Habits</p>
        </div>
      </div>
    </>
  )
}

export default DailyProgress
