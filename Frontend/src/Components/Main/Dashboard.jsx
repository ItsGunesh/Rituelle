import React from 'react'
import Navigator from '../Navigator/Navigator.jsx'
import TaskIndex from '../Main/Tasks/TaskIndex.jsx'
import HabitsIndex from '../Main/HabitMap/HabitsIndex.jsx'

const Dashboard = () => {
  return (
    <>
      <div className='sticky top-0 z-999'>
        <Navigator/>
      </div>
      <div className='bg-gray-300 h-[100%] w-[100%] py-4 px-10 box-border flex gap-4'>
        <HabitsIndex/>
        <TaskIndex/>
      </div>
      <div>
      </div>

    </>
  )
}

export default Dashboard
