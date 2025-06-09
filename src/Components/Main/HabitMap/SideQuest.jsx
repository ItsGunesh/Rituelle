import React from 'react'

const SideQuest = ({habit , type}) => {
  return (
    <>
      <div className='bg-white border-1 border-gray-400 rounded-2xl w-[22%] shadow-lg'>
        <div className='p-4'>
          <h3 className='text-2xl font-bold'>{habit}</h3>
          <p className='text-xs '>{type}</p>
        </div>
      </div>
    </>
  )
}

export default SideQuest
