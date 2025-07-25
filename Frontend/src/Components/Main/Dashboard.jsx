import React from 'react'
import Navigator from '../Navigator/Navigator.jsx'
import TaskIndex from '../Main/Tasks/TaskIndex.jsx'
import HabitsIndex from '../Main/HabitMap/HabitsIndex.jsx'
import Quote from '../Quote/Quote.jsx'

const Dashboard = () => {
  return (
    <>
      <div className='bg-gray-600 min-h-screen w-full'>
        <div className='sticky top-0 z-999'>
          <Navigator />
        </div>
        <div className=' h-[100%] w-[100%] py-4 px-10 box-border flex gap-4'>
          <HabitsIndex />
          <TaskIndex />
        </div>
        {/* <Quote/> */}
      </div>
    </>
  )
}

export default Dashboard
